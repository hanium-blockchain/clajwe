pragma solidity ^0.5.0;

import "./HToken.sol";
import "./AssetToken.sol";


contract AssetTokenCrowdsale {

    HToken public htoken;
    AssetToken public assettoken;
    bytes32 public fundTarget; 
    uint256 public tokenRate; // 3 , 4
    //uint256 public tokenSettle; // 청산비율  0.8 1.5 H Token   --> 제거 
    uint256 public tokenSentTillNow;
    uint256 public totalWithdrawal;
    uint256 public remainAssetToken;  
    uint256 public crowdFundingEndDay; 
    //address public owner;
    address public assettokenOwnerAddr;
    uint256 public settleRate; // 20 이면 20% 1 asset 토큰당 20% HToken
    //mapping(address => funder) public cfunders;

    address[] crowdFunder; 
    address[] majorfunder;
    bool settlement;

    //mapping(address => funder) public htokenAddr;
    //mapping(address => funder) public crowdfunders;

    //struct funder {
    //    uint256 sentHToken;
    //    uint256 recvAssetToken;
    //    bool bWithdrawal; //청산여부 
    //}

    event SoldToken(address _funder, uint256 _amount);


    function setAssetTokenCrowdsale(  
        address _htokenAddr,
        address _htokenOwnerAddr,
        address _assettokenAddr,
        address _assettokenOwnerAddr,
        uint256 _crowdFundingEndDay) public {
        htoken = HToken(_htokenAddr);
        assettoken = AssetToken(_assettokenAddr);
        //owner = msg.sender;
        assettokenOwnerAddr = _assettokenOwnerAddr;
        remainAssetToken = assettoken.balanceOf(_assettokenOwnerAddr);
        fundTarget = "HT";
        tokenRate = assettoken.getTokenExRate();
        crowdFundingEndDay = _crowdFundingEndDay;
        settlement = false;
    }

    function hTokenbalanceOf(address _addr) external view returns (uint256) {
       return htoken.balanceOf(_addr);
    }

    function assetTokenbalanceOf(address _addr) external view returns (uint256) {
       return assettoken.balanceOf(_addr);
    }

    //crowd sale 정보를 가져오는 contract
    function getAssetCrowdSaldInfo() external view returns(bytes32, uint256, uint256, uint256, uint256, uint256, uint256, uint256) {
       return (fundTarget, tokenRate, assettoken.totalSupply(), tokenSentTillNow, totalWithdrawal, remainAssetToken, assettoken.getSettleInfo(), crowdFundingEndDay);
    }
    
    //crowd sale
    function requestCrowdSale(address _from, uint256 _htoken) public {
        //require(msg.sender != owner , "Owner can't join crowdsale");
        require(remainAssetToken > 0, "Target fund completed.");
        uint256 rewardassettoken = calculateToken(_htoken);
        require(rewardassettoken < remainAssetToken, "Token exceeds the whole supply.");
        //assettoken.addbalance(msg.sender, rewardassettoken);
        assettoken.transferFrom(assettokenOwnerAddr, _from, rewardassettoken); // asset token 이관 
        htoken.transferFrom(_from, assettokenOwnerAddr, _htoken); // htoken 이관 
        remainAssetToken -= rewardassettoken;
        tokenSentTillNow += rewardassettoken;

        crowdFunder.push(_from);

        emit SoldToken(msg.sender, rewardassettoken);
    }


    //for loop을 돌면서 crowd funder에게 청산함
    function settlementCrowdSale(uint256 _earnrate) public {
      //uint256 settle_asset_token;
       uint256 settle_htoken;
      // uint256

      majorfunder = getMajorfunder();
       // crowdFunder
       for(uint j=0 ; j < majorfunder.length; j++) {
          crowdFunder.push(majorfunder[j]);
       }

       for(uint i=0 ; i < crowdFunder.length; i++) {

           //settle_asset_token = assettoken.balanceOf(crowdFunder[i]);
           settle_htoken = (assettoken.balanceOf(crowdFunder[i])*(100+_earnrate))/(100*tokenRate);

           assettoken.transferFrom(crowdFunder[i], assettokenOwnerAddr, assettoken.balanceOf(crowdFunder[i]));
           htoken.transferFrom(assettokenOwnerAddr, crowdFunder[i], settle_htoken);   
           assettoken.writeSettle(assettoken.balanceOf(crowdFunder[i]));

       }

       settlement = true;
    }

    function getMajorfunder() public returns(address[] memory) {
        return assettoken.getMajorfunder();
    }

    // asset token 소각 
    function incineration () public {
        require(settlement);
        assettoken.burnAssetToken();
    }

    // HToken간 보상배율 결정
    function calculateToken(uint256 _val) public view returns (uint256) {
        return (_val * tokenRate); // asset token 교환 비율 
    }

}