'use strict';

import shareThis from 'share-this';
import * as twitterSharer from 'share-this/dist/sharers/twitter';
import * as facebookSharer from 'share-this/dist/sharers/facebook';
//import * as linkedinSharer from 'share-this/dist/sharers/linked-in';
import * as emailSharer from 'share-this/dist/sharers/email';

const selectionShare = shareThis({
  selector: '.post__container',
  sharers: [facebookSharer, twitterSharer, emailSharer]
});

export default selectionShare;