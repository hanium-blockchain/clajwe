pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract AssetToken  {

    using SafeMath for uint256;

    //struct TokenInfo {
        uint256  tokenTotalSupply; //통 발행량 
        uint256  settletokenNum; //총회수량
        string  tokenNm; //토큰이름  
        uint256  tokenPrice; //토큰가격
        string  exTarget; // 교환대상 
        string  tokenId; // 토큰 id (RDB상)
        string  assetId; // 자산 id (역시 RDB상)
        uint256  settletokenday; //청산일 
    //}

    mapping (address => uint256) public balances; //각 주소의 잔고
    //mapping (bytes32 => mapping (address => uint256)) public crowdsale_rate; //크라우드 소싱 비율을 넣는 mappping 자료구조

    address public owner;
    //RegisterAsset public regasset;
    address[] majorfunder;

    function setAssetToken(  
    uint256 _tokenTotalSupply,
    string memory _tokenNm, 
    string memory _exTarget,
    uint256 _tokenPrice, 
    string memory _tokenId, 
    string memory _assetId,
    uint256 _settletokenday
    ) public {
        tokenTotalSupply = _tokenTotalSupply;
        tokenNm = _tokenNm;
        exTarget = _exTarget;
        tokenPrice = _tokenPrice;
        tokenId = _tokenId;
        assetId = _assetId;
        settletokenday = _settletokenday;
        //regasset = RegisterAsset(_assetAddr);
        settletokenNum = 0; // 초기는 0으로 세팅
        //tokeninfo.isToken = true;
        balances[msg.sender] = _tokenTotalSupply;
        //regasset.setAssetTokenization(_assetId);
        owner = msg.sender;
    }
    
    function getAssetId() public view returns(string memory) {
        return assetId;
    }

    function getTokenExRate() public view returns(uint256) {
        return tokenPrice;
    }

    function getMajorfunder() public view returns(address[] memory) {
        return majorfunder;
    }

    //Basic Token Fucntion
    function totalSupply() public view returns (uint256) {
        return tokenTotalSupply;
    }

    function initialTransfer(address _to, uint256 _rate) public {
        // 비율에 따라 초기 분배  rate 1~100사이  
        uint256 value = tokenTotalSupply * _rate/100;
        require(balances[owner] > value, "balance is empty");
        balances[owner] -= value;
        balances[_to] += value;
        majorfunder.push(_to);
        //emit Transfer(msg.sender, _to, value);
    }
    function transfer(address _to, uint256 _value) public returns (bool) {
        require(_to != address(0));
        require(_value <= balances[owner]);
        balances[owner] -=  _value;
        balances[_to] += _value;
        //emit Transfer(msg.sender, _to, _value);
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
       //emit Transfer(_from, _to, _value);
       return true;
    }
    function writeSettle(uint256 _value) public {

          settletokenNum += _value;
    }

    function getSettleInfo() public view returns(uint256) {
        return settletokenNum;
    }
    //사전에 모든 토큰이 청산되었다는 가정.
    function burnAssetToken() public {
        balances[owner] = 0;
    }


}