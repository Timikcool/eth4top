// import axios from 'axios';
import { ethers } from "ethers";
import Web3 from "web3";
import ABI from "./abi.json";
const ADDRESS = "0x55925f2f807b7c9df151f042165eed8c7d8a417a";

export const connectToEth = async () => {
  //обязательный шаг
  window.ethereum.enable();
  return await getAddress();
};

export const getContract = web3 => {
  if (web3) {
    return new web3.eth.Contract(ABI.abi, ADDRESS);
  } else {
    const web3 = getWeb3();
    return new web3.eth.Contract(ABI.abi, ADDRESS);
  }
};

export const checkIsRinkeby = async () => {
  const network = await getWeb3().eth.net.getNetworkType();
  if (network !== "rinkeby") {
    alert("You better connect your Metamask to Rinkeby network");
  }
};

export const getWeb3 = () => {
  return new Web3(Web3.givenProvider || "http://localhost:8545");
};

// получаем провайдер
export const getProvider = () => {
  return window.web3
    ? new ethers.providers.Web3Provider(window.web3.currentProvider)
    : ethers.getDefaultProvider("rinkeby");
};

// получаем адрес клиента
export const getAddress = callback => {
  const provider = getProvider();
  const signer = provider.getSigner();
  return signer.getAddress();
};

// этим способом можно получить правильный порядок айдишников постов.
export const getSortedPosts = async callback => {
  const ids = await getContract()
    .methods.getTopTenIds()
    .call();

  //тут по id получаем посты
  await Promise.all(ids.map(id => getPost(id))).then(result => {
    const postsFormatted = result.map(post => normalizePost(post));
    callback(postsFormatted);
  });
};

// приводим пост к норм виду
export const normalizePost = post => {
  return {
    text: post.text,
    id: parseInt(post.id),
    price: parseInt(post.price),
    author: post.author,
    time: parseInt(post.timestamp)
  };
};

// получаем пост по id
export const getPost = postId => {
  return getContract()
    .methods.posts(postId)
    .call();
};

export const getTenPosts = (page, callback) => {
  return getContract()
    .methods.getTenPosts(page)
    .call()
    .then(res => {
      const pageSize = 10;
      let posts = [];
      console.log(res);

      for (let i = 0; i < pageSize; i++) {
        posts.push({
          id: res.ids[i],
          author: res.authors[i],
          text: res.texts[i],
          timestamp: res.timestamps[i],
          price: res.prices[i]
        });
      }
      callback(
        posts.filter(
          ({ author }) =>
            author !== "0x0000000000000000000000000000000000000000"
        )
      );
    });
};

// создаём пост, вешаем обработчики
export const createPost = (
  account,
  text,
  ether,
  confirmationCallback,
  errorCallback
) => {
  getContract()
    .methods.createPost(text)
    .send({
      from: account,
      value: window.web3.toWei(ether.toString(), "ether")
    })
    .on("transactionHash", hash => {
      console.log("# transaction hash ", hash);
    })
    .on("receipt", receipt => {
      console.log("# receipt ", receipt);
    })
    .on("confirmation", (number, rec) => {
      // ждём первого подтверждения, обычно ждут 2-3
      console.log("# confirmation ", number, rec);
      if (number === 1) {
        confirmationCallback(rec);
      }
    })
    .on("error", errorCallback);
};

export const subscribeToNewPostEvent = callback => {};
