pragma solidity ^0.8.9;

contract VoteMain {
    address public owner;
    address mailbox = 0xfFAEF09B3cd11D9b20d1a19bECca54EEC2884766; // sepolia mailbox
    constructor( address _mailbox) payable {
        mailbox = _mailbox;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    struct sharedWith {
        string cid;
        address receiver;
        bytes32 timestamp;
    }

    //mapping to store the CID and receiver
    mapping(address => sharedWith[]) dataHolder;
    event addedFileToIPFS(address _sender, address _receiver, string _cid);

    // Modifier so that only mailbox can call particular functions
    modifier onlyMailbox(){
        require(msg.sender == mailbox, "Only mailbox can call this function !!!");
        _;
    }

    function addFileToIPFS(address _sender, address _receiver, string memory _cid) internal {
        require(msg.sender != _receiver);
        dataHolder[_sender].push(sharedWith(_cid,_receiver,bytes32(block.timestamp)));
        emit addedFileToIPFS(_sender, _receiver, _cid);
    }

    function getFiles(address _sender) external view returns(sharedWith[] memory){
        return dataHolder[_sender];
    }

    // handle function which is called by the mailbox to bridge votes from other chains
    function handle(uint32 _origin, bytes32 _sender, bytes memory _body) external onlyMailbox{
        (uint256 callType, bytes memory _data) = abi.decode(_body, (uint256, bytes));
        if(callType == 1){
            (address _senderid, address _receiver, string memory _cid) = abi.decode(_data, (address, address, string));
            addFileToIPFS(_senderid, _receiver, _cid);
        }
    }
    receive() external payable{}
}