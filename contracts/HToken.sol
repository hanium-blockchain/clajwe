pragma solidity ^0.5.0;


contract HToken {

    uint256  tokenTotalSupply;
    string tokenNm;
    uint256  tokenPrice;
    string tokenId;

    mapping (address=> uint256) public balances; //각 주소의 잔고

    function setTokenInfo(  
    uint256 _tokenTotalSupply,
    string memory _tokenNm, 
    uint256 _tokenPrice, 
    string memory _tokenId) public {
        tokenTotalSupply = _tokenTotalSupply;
        tokenNm = _tokenNm;
        tokenPrice = _tokenPrice;
        tokenId = _tokenId;
        balances[msg.sender] = _tokenTotalSupply;
    }
 
    //Basic Token Fucntion
    function totalSupply() public view returns (uint256) {
        return tokenTotalSupply;
    }
    
    function transfer(address _to, uint256 _value) public returns (bool) {
       require(_to != address(0));
       require(_value <= balances[msg.sender]);

       balances[msg.sender] -=  _value;
       balances[_to] += _value;
      // emit Transfer(msg.sender, _to, _value);
       return true;
    }
    
    function balanceOf(address _owner) public view returns (uint256) {
       return balances[_owner];
    }


    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
       require(_to != address(0));
       require(_value <= balances[_from]);
       //require(_value <= allowed[_from][msg.sender]);

       balances[_from] -=_value;
       balances[_to] += _value;
      // allowed[_from][msg.sender] -= _value;
      // emit Transfer(_from, _to, _value);
       return true;
    }

}