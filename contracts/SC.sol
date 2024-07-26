// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract SC {
    address public owner;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct Order {
        uint256 time;
        Item item;
    }
    // List of items
    mapping(uint256 => Item) public items;
    // Order what did the address order
    mapping(address => uint256) public orderCount;
    // Order 1,2,3,4
    mapping(address => mapping(uint256 => Order)) public orders;


    event Buy(address buyer, uint256 orderId, uint256 itemId);
    event List(string name, uint256 cost, uint256 quantity);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // list products
    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {
        Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );

        items[_id] = item;

        emit List(_name, _cost, _stock);
    }

    // buy products
    function buy(uint256 _id) public payable {

        // Fetch item
        Item memory item = items[_id];

        // Make sure enough ether to buy item
        require(msg.value >= item.cost);
        // Make sure item is available in the stock
        require(item.stock>0);
        // Create an order
        Order memory order = Order(block.timestamp, item);
        // Save order to chain
        orderCount[msg.sender]++;// order id
        orders[msg.sender][orderCount[msg.sender]] = order;

        // substract stock
        items[_id].stock--;

        // emit event
        emit Buy(msg.sender, orderCount[msg.sender],item.id);
    }
    function withdraw() public onlyOwner() {
        (bool success,) = owner.call{value:address(this).balance}("");
        require(success);
    }
    // Withdraw funds
}
