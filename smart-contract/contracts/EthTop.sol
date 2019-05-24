pragma solidity >=0.4.25 <0.6.0;
// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract EthTop {
	address owner;
	uint amount; // деньги на контракте

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

	// пост создан
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
			flag = true;
			for( uint i = 1; i < sortedPosts.length; i++ ) {
				if( sortedPosts[i-1].price < sortedPosts[i].price ) {
					tmpPost = sortedPosts[i-1];
					sortedPosts[i-1] = sortedPosts[i];
					sortedPosts[i] = tmpPost;
					flag = false;
				}
			}
		}
		return sortedPosts;
	}

	/*function getTopTenPosts() external view returns (Post[] memory) {
		Post[] memory sortedPosts = sortByPrice();
		uint size = sortedPosts.length < 10 ? sortedPosts.length : 10;
		Post[] memory topTen = new Post[] (size);

		for( uint i = 0; i < size; i++) {
			topTen[i] = sortedPosts[i];
		}
		return topTen;
	}*/

	function getTopTenIds() external view returns ( uint[] memory ) {
		Post[] memory sortedPosts = sortByPrice();
		uint size = sortedPosts.length < 10 ? sortedPosts.length : 10;
		uint[] memory topTen = new uint[] (size);

		for( uint i = 0; i < size; i++) {
			if( i < sortedPosts.length ) {
				topTen[i] = sortedPosts[i].id;
			}
		}
		return topTen;
	}

	function getAllPosts()
		external
		view
		returns(/*string[] memory, */uint[] memory, uint[] memory, uint[] memory, address[] memory)
	{
		uint size = posts.length;
		string[] memory texts = new string[](size);
		uint[] memory ids = new uint[](size);
		uint[] memory prices = new uint[](size);
		uint[] memory timestamps = new uint[](size);
		address[] memory authors = new address[](size);

		for( uint i = 0; i < size; i++ ) {
			texts[i] = posts[i].text;
			ids[i] = posts[i].id;
			prices[i] = posts[i].price;
			timestamps[i] = posts[i].timestamp;
			authors[i] = posts[i].author;
		}

		return (/*texts, */ids, prices, timestamps, authors);
	}

	function getAmount() public view returns (uint) {
		return amount;
	}

	function widthdraw() public {
		require(msg.sender == owner, "Only owner can withdraw money from the contract");
		msg.sender.transfer(amount);
	}
}
