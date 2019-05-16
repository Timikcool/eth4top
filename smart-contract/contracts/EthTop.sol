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
	// пост такой-то получил стлько-то денег
	event PostUpdated(uint indexed _id, uint _price, address indexed _author);

	function createPost(string memory _text) public payable returns (uint){
		uint id = posts.push(Post(_text, 0, msg.value, msg.sender)) - 1;
		posts[id].id = id;
		emit PostCreated(_text, id, msg.value, msg.sender);
		return id;
	}

	/*(function updatePost(uint _id) external payable {
		uint money = msg.value;
		amout += money;
		posts[_id].price += money;// тут money уже может быть равен нулю
	}*/

	/*function getPosts(uint _count ,uint _offset) external view {
		return posts;
	}*/

	/*function widthdraw() public {
		require( msg.sender == owner);
		owner.transfer( address(this).balance );
	}*/
}
