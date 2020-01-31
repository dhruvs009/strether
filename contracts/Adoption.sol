pragma solidity 0.5.0;

contract Adoption {
    address[16] public adoptors;

    function adopt(uint _petid) public returns(uint) {
        require(_petid >=0 && _petid <=15);
        adoptors[_petid] = msg.sender;
        return _petid;
    }
    
    function getAdopters() public view returns(address[16] memory) {
        return adoptors;
    }
}
