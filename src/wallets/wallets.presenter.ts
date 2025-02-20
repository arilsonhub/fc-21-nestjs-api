import { AssetsPresenter } from 'src/assets/assets.presenter';
import { Asset } from '../assets/entities/asset.entity';
import { WalletAsset } from './entities/wallet-asset.entity';
import { Wallet } from './entities/wallet.entity';

export class WalletsPresenter {
  constructor(
    private wallet: Wallet & { assets: (WalletAsset & { asset: Asset })[] },
  ) {}

  toJSON() {
    return {
      _id: this.wallet._id,
      assets: this.wallet.assets.map((walletAsset) => {
        const assetPresenter = new AssetsPresenter(walletAsset.asset);
        return {
          asset: assetPresenter.toJSON(),
          shares: walletAsset.shares,
        };
      }),
    };
  }
}