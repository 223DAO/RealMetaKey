# 界面交互设计

界面大概写一下，不要太丑就行。

Grants和Redeem页面可以复用一些界面样式，尽量风格差不多

开发相关：
- 合约在contract目录
- 使用ethers.js调用合约
- 复制合约生成的binding(.d.ts文件)到frontend，ts中可以直接调用


## Grants页面

### 没有登录时

显示一段话：“Connect MetaMask to grant.”

下方显示Connect按钮，按钮背景用MetaMask的图

点击Connect按钮：连接MetaMask

### 登录后

顶部显示Superfluid的balance

https://docs.superfluid.finance/superfluid/protocol-developers/interactive-tutorials/money-streaming

中间有3个Grant卡片从左往右排列，分别是
- 支持0.1 MATIC Season1（1 Minute）（送1个 x1 NFT，可以兑换1个Key）
- 支持0.5 MATIC Season1（1 Minute）（送1个 x6 NFT，可以兑换6个Key）
- 支持1 MATIC Season1+Season2（2 Minute）（送2个 x6 NFT，可以兑换12个Key）

没有发起Grant时，卡片显示文案，并且可点击。点击卡片，创建Superfluid的Flow，同时刷新卡片状态。
- Contribute 0.1 Matic for Season 1 (You will get an x1 NFT, can redeem 1 key)
- Contribute 0.5 Matic for Season 1 (You will get an x6 NFT, can redeem 6 keys)
- Contribute 1 Matic for Season 1 & Season 2 (You will get two x6 NFT, can redeem 2*6 keys)

发起了Grant时，除了上面的文字，卡片底部增加文字 Streamming。

待定：
- 能否从Superfluid API查到用户已经发起了Streamming？查不到的话，就直接用LocalStorage存一下好了，用户可以重复创建多个相同的Grant
- 点击能否直接跳转到Superfluid中对应的Flow，从而可以暂停？如果做不到，就直接不能点击好了。


## Redeem页面

NFT兑换Key

### 没有登录时

顶部显示：“Remaining keys in the store: 180”，合约接口为 KeyStore.getRemainingKeys

在下面显示一段话：“Connect MetaMask to redeem your keys!”，字稍微大一点。

下方显示Connect按钮，按钮背景用MetaMask的图

点击Connect按钮：连接MetaMask

### 登录后

顶部还是显示：“Remaining keys in the store: 180”

加载用户的NFT列表，合约接口为 KeyStore.getNfts

如果没有NFT：显示“You don't have any NFT.”，字稍微大一点

如果有NFT，显示NFT列表

列表中的每一个NFT
- 左侧：显示NFT的图片
- 右侧上方：显示这个NFT已经兑换到的Key（扩展：默认显示成星号，切换开关显示明文）
- 右侧下方：显示兑换按钮，如果不可继续兑换，则按钮置灰。文字：“Redeem (Remain 1/6)”，表示总共可兑换6个，还剩1个。或者如果图片能直接展示出来，可以不显示Remain文字。

点击兑换按钮，合约接口为 KeyStore.redeemKey
- 兑换出来的Key显示到已兑换的Key列表里，并且加粗显示。
- 刷新NFT的图片。
- 刷新Redeem按钮状态。
- 刷新RemainingKeys数量。
