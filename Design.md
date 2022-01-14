
## NFT兑换页面交互设计

界面大概写一下，不要太丑就行。

开发相关：
- 合约在contract目录
- 使用ethers.js调用合约
- 复制合约生成的binding(.d.ts文件)到frontend，ts中可以直接调用

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
