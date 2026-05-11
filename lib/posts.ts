export type MediaItem = {
  kind: "image" | "video";
  src: string;
};

export type Post = {
  id: number;
  slot: string;
  platform: string;
  contentType: string;
  pillar: string;
  media: MediaItem[];
  productLink: string;
  caption: string;
  hashtags: string;
  purpose: string;
};

const mediaFor = (assetField: string): MediaItem[] => {
  return assetField
    .split(/\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((name) => {
      const lower = name.toLowerCase();
      if (lower.endsWith(".mp4") || lower.endsWith(".mov") || lower.endsWith(".webm")) {
        return { kind: "video", src: `/assets/videos/${name}` };
      }
      return { kind: "image", src: `/assets/images/${name}` };
    });
};

const raw: Omit<Post, "id" | "media"> & { asset: string }[] = [
  {
    slot: "Day 1",
    platform: "IG, FB and Tiktok",
    contentType: "Video",
    pillar: "Video / Reels",
    asset: "Vid-1.mp4",
    productLink:
      "https://www.shimmerthelabel.com.au/products/abstract-dress-charcoal",
    caption:
      "The way it moves. The way it falls. The way it makes you feel. ✨\nSome dresses you wear. Others you arrive in",
    hashtags:
      "#shimmerthelabel #ootd #fashionreels #australianfashion #dressreels #springfashion",
    purpose: "Engagement and Follower Growth",
  },
  {
    slot: "Day 2",
    platform: "IG and FB",
    contentType: "Image",
    pillar: "Product Focus",
    asset: "8.png",
    productLink: "",
    caption:
      "Sun-drenched walls, a printed maxi, and absolutely nowhere to be. The Secret Garden Dress in Blue.\nBack in stock.",
    hashtags:
      "#shimmerthelabel #maxidress #bluedress #summerstyle #resortwear #spring2026",
    purpose: "Link clicks, add-to-carts.",
  },
  {
    slot: "Day 3",
    platform: "IG and FB",
    contentType: "Image",
    pillar: "Relatable / Meme",
    asset: "13.png",
    productLink:
      "https://www.shimmerthelabel.com.au/products/secret-garden-halter-dress-blue",
    caption:
      "Buy that dress. Life is too short. 🤝 (the only sign we needed)",
    hashtags:
      "#shimmerthelabel #buythatdress #lifeistooshort #fashionmeme #relatable #ootd",
    purpose: "Shares + comments. Memes drive 3-5x reach vs editorial.",
  },
  {
    slot: "Day 4",
    platform: "IG and FB",
    contentType: "Image",
    pillar: "Editorial / Hero",
    asset: "14.png",
    productLink: "https://www.shimmerthelabel.com.au/products/amber-dress-ivory",
    caption:
      "SHIMMER. October creation. A ritual of light, movement, and quiet luxury. Our newest edit lands this week.",
    hashtags:
      "#shimmerthelabel #shimmer #australianfashion #premiumfashion #occasiondress #editorial",
    purpose: "Saves + profile visits.",
  },
  {
    slot: "Day 5",
    platform: "IG and FB",
    contentType: "Carousel",
    pillar: "Editorial / Hero",
    asset: "5.png 7.png",
    productLink:
      "https://www.shimmerthelabel.com.au/products/monet-tie-bust-dress-yellow",
    caption:
      "A Sunday in soft focus. Spring Lovin’ wandering, wondering, golden hour on repeat. Slide for the after-dark version.",
    hashtags:
      "#shimmerthelabel #springlovin #floraldress #goldenhour #fashioncarousel #occasiondress",
    purpose: "Profile visits, collection page traffic.",
  },
  {
    slot: "Day 6",
    platform: "IG, FB and Tiktok",
    contentType: "Video",
    pillar: "Video / Reels",
    asset: "Vid-2.mp4",
    productLink:
      "https://www.shimmerthelabel.com.au/products/elite-mini-dress-latte",
    caption:
      "Main character, no notes. 🌅\nOne dress. One golden hour. That’s the whole brief.",
    hashtags:
      "#shimmerthelabel #tryonreel #fashionreels #fabricmovement #dressreels #ootd",
    purpose: "Engagement and Follower Growth",
  },
  {
    slot: "Day 7",
    platform: "IG and FB",
    contentType: "Image",
    pillar: "Flat Lay / Detail",
    asset: "1.png",
    productLink:
      "https://www.shimmerthelabel.com.au/products/allure-textured-dress-olive",
    caption:
      "Tobacco. Pampas. A morning that asks nothing of you. The Status Halter Dress in Copper.",
    hashtags:
      "#shimmerthelabel #flatlay #styledetails #neutralfashion #halterdress #autumnstyle",
    purpose: "Likes + saves.",
  },
  {
    slot: "Day 8",
    platform: "IG and FB",
    contentType: "Image",
    pillar: "Relatable / Meme",
    asset: "18.png",
    productLink: "https://www.shimmerthelabel.com.au/products/sasha-dress-lagoon",
    caption: "Me when i see an empty hallway 🚶‍♀️",
    hashtags:
      "#shimmerthelabel #fashionmeme #runway #ootd #relatable #fashiongirlies",
    purpose: "Meme content for reach + brand voice and follower growth.",
  },
  {
    slot: "Day 9",
    platform: "IG and FB",
    contentType: "Image",
    pillar: "Product Focus",
    asset: "9.png",
    productLink:
      "https://www.shimmerthelabel.com.au/products/monet-tie-bust-dress-yellow",
    caption:
      "Via S. Pietro, Puglia, somewhere between lunch and a long walk. The Finesse Halter Dress in Print.",
    hashtags:
      "#shimmerthelabel #yellowdress #floraldress #italiansummer #vacationstyle #halterdress",
    purpose: "Travel-aspiration post. Link clicks, saves (high travel/holiday intent).",
  },
  {
    slot: "Day 10",
    platform: "IG and FB",
    contentType: "Sticker poll",
    pillar: "UGC / Lifestyle",
    asset: "17.png",
    productLink: "https://www.shimmerthelabel.com.au/products/sasha-dress-lagoon",
    caption:
      "No one:\nMe at 2am: 👀 which one’s making it into the cart?",
    hashtags:
      "#shimmerthelabel #2am #wishlist #fashionmeme #relatable #shoppingaddict",
    purpose: "Poll responses, DMs.",
  },
  {
    slot: "Day 11",
    platform: "IG and FB",
    contentType: "Image",
    pillar: "Editorial / Hero",
    asset: "11.png",
    productLink:
      "https://www.shimmerthelabel.com.au/products/elite-twist-bust-dress-black-1",
    caption:
      "Black on black on black. The Elite Twist Bust Dress. A quiet kind of confidence.",
    hashtags:
      "#shimmerthelabel #blackdress #minimalfashion #eveningwear #elegant #knitdress",
    purpose: "Premium positioning — black hero.",
  },
  {
    slot: "Day 12",
    platform: "IG and FB",
    contentType: "Image",
    pillar: "Promo / Conversion",
    asset: "16.png",
    productLink: "",
    caption:
      "15% OFF your first Shimmer. Use FIRST15 at checkout.\nValid on orders over $450, one per customer. Quietly your sign.",
    hashtags:
      "#shimmerthelabel #firstpurchase #discount #australianfashion #shopnow",
    purpose: "First-purchase activation. Code redemptions, new customer revenue.",
  },
  {
    slot: "Day 13",
    platform: "IG and FB",
    contentType: "Image",
    pillar: "Flat Lay / Detail",
    asset: "3.png",
    productLink: "",
    caption: "The twist that makes the dress.",
    hashtags:
      "#shimmerthelabel #styledetails #fabriclove #blackdress #elite #closeup",
    purpose: "Macro/detail shot — premium fabric storytelling.",
  },
  {
    slot: "Day 14",
    platform: "IG and FB",
    contentType: "Image",
    pillar: "Editorial / Hero",
    asset: "15.png",
    productLink: "https://www.shimmerthelabel.com.au/products/fiesta-dress-coral",
    caption:
      "Strike Out louder than your average Friday. Print study by Shimmer The Label.",
    hashtags:
      "#shimmerthelabel #strikeout #printlovers #colourfulfashion #boldprint #australiandesigner",
    purpose: "Collection page traffic.",
  },
  {
    slot: "Day 15",
    platform: "IG and FB",
    contentType: "Carousel",
    pillar: "UGC / Lifestyle",
    asset: "10.png 2.png",
    productLink:
      "https://www.shimmerthelabel.com.au/products/elite-mini-dress-latte",
    caption:
      "How you’re wearing the Elite Mini. From Bondi to backstreets.\nSlide → through your favourites.",
    hashtags:
      "#shimmerthelabel #ourgirls #realgirls #ugc #elitemini #howtostyle",
    purpose: "UGC + community post. Comments, tagged content.",
  },
  {
    slot: "Day 16",
    platform: "IG, FB and Tiktok",
    contentType: "Video",
    pillar: "Video / Reels",
    asset: "Vid-3.mp4",
    productLink:
      "https://www.shimmerthelabel.com.au/products/monet-tie-bust-dress-yellow",
    caption:
      "Built for the slow afternoons and the long nights.\nShimmer The Label. Wear it like you mean it.",
    hashtags:
      "#shimmerthelabel #fashionreels #vacationoutfits #ootd #dressreels",
    purpose: "Engagement and Follower Growth",
  },
  {
    slot: "Day 17",
    platform: "IG and FB",
    contentType: "Image",
    pillar: "Flat Lay / Detail",
    asset: "4.png",
    productLink:
      "https://www.shimmerthelabel.com.au/products/abstract-dress-charcoal",
    caption: "Hung, ready, waiting for you to choose where it goes next.",
    hashtags:
      "#shimmerthelabel #stilllife #flatlay #fabriclove #bluedress #cottoncampaign",
    purpose: "Soft-sell, mood-led product post. Saves, profile visits.",
  },
  {
    slot: "Day 18",
    platform: "IG and FB",
    contentType: "Image",
    pillar: "Editorial / Hero",
    asset: "12.png",
    productLink:
      "https://www.shimmerthelabel.com.au/products/abstract-dress-charcoal",
    caption: "Sundays in print. The Secret Garden Dress. Straw hat optional.",
    hashtags:
      "#shimmerthelabel #sundaystyle #maxidress #strawhat #resortwear #italianstyle",
    purpose: "Closes the month on hero brand image.",
  },
  {
    slot: "Day 19",
    platform: "IG and FB",
    contentType: "Image",
    pillar: "Product Focus",
    asset: "6.png",
    productLink:
      "https://www.shimmerthelabel.com.au/products/calibre-tie-bust-dress-vanilla",
    caption:
      "White on white, tied at the bust, slingbacks waiting. A dress for arrivals.",
    hashtags:
      "#shimmerthelabel #whitedress #weddingguest #flatlay #engagementoutfit #bridal",
    purpose: "Wedding/engagement intent.",
  },
] as any;

export const posts: Post[] = (raw as any[]).map((p, idx) => ({
  id: idx + 1,
  slot: p.slot,
  platform: p.platform,
  contentType: p.contentType,
  pillar: p.pillar,
  productLink: p.productLink,
  caption: p.caption,
  hashtags: p.hashtags,
  purpose: p.purpose,
  media: mediaFor(p.asset),
}));
