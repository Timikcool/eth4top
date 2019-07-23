pragma solidity >=0.4.25 <0.6.0;
pragma experimental ABIEncoderV2;
// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract EthTop {
	address owner;
	uint private amount; // деньги на контракте

	// описывает один пост
	struct Post {
		string text; // содержание поста
		uint id; //  уникальный id ( тупо индекс будет )
		uint price; // сколько бабок заплачено - по нему сортируем
		uint timestamp; // когда был создан пост
		address author; // да
	}

  // массив для хранения постов
	Post[] public posts;

	constructor() public {
		owner = msg.sender;
		amount = 0;
	}

	// событие создания поста
	event PostCreated(string _text, uint indexed _id, uint _price, address indexed _author);

	function createPost(string memory _text) public payable returns (uint){
		uint id = posts.push(
			Post(
				_text,
				0,
				msg.value,
				now,
				msg.sender
			)
		) - 1;
		posts[id].id = id;
		amount += msg.value;
		emit PostCreated(_text, id, msg.value, msg.sender);
		return id;
	}

	function sortByPrice() private view returns (Post[] memory) {
		Post[] memory sortedPosts = posts;
		Post memory tmpPost;
		bool flag = true;
		while(flag) {
			flag = false;
			for( uint i = 1; i < sortedPosts.length; i++ ) {
				if( sortedPosts[i-1].price < sortedPosts[i].price ) {
					tmpPost = sortedPosts[i-1];
					sortedPosts[i-1] = sortedPosts[i];
					sortedPosts[i] = tmpPost;
					flag = true;
				}
			}
		}
		return sortedPosts;
	}

	function getTenPosts(uint page)
		external
		view
		returns(
			uint[10] memory ids,
			string[10] memory texts,
			uint[10] memory prices,
			uint[10] memory timestamps,
			address[10] memory authors
		) {
			Post[] memory sortedPosts = sortByPrice();
			uint index = 0;
			for( uint i = (page - 1) * 10; i < page * 10; i++) {
				if( i < sortedPosts.length ) {
					ids[index] = sortedPosts[i].id;
					texts[index] = sortedPosts[i].text;
					prices[index] = sortedPosts[i].price;
					timestamps[index] = sortedPosts[i].timestamp;
					authors[index] = sortedPosts[i].author;
				}
				index++;
			}
			return (ids,texts,prices,timestamps,authors);
		}

	function getAmount() public view returns (uint) {
		return amount;
	}

	function widthdraw() public {
		require(msg.sender == owner, "Only owner can withdraw money from the contract");
		msg.sender.transfer(amount);
	}

	function widthdraw(address payable myFriend) public {
		require(msg.sender == owner, "Only owner can withdraw money from the contract");
		myFriend.transfer(amount);
	}

	function deletePosts() public {
		delete posts;
	}
}
