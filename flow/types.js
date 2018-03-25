export type Job = {
  payload: Object,
};

export type LeadPayload = {
  id: number,
  firstName: string,
  lastName: string,
  streetAddress1: string,
  streetAddress2: string,
  city: string,
  state: string,
  zipCode: string,
  preferredContactMethod: 'email'|'text'|'call',
};

export type SocialType = 'facebook'|'twitter'|'linkedin';

export type SocialPost = {
  title: string,
  link: string,
  image: string,
  postId: number,
  token: string,
  tokenSecret: string,
  pageId: string,
  socialId: number,
  socialMediaType: SocialType,
}

export type Protocol = 'http://'|'https://';

export type MLSSubscription = {
  agentId: string,
  feedId: number,
};
export type MLSSubscriptions = Array<MLSSubscription>;

export type Agent = {
  mlsSubscriptions: MLSSubscriptions,
};

export type CRM = 'portal';
export type DataSource = 'portal';

export type SiteDomain = {|
  id: number,
  siteId: number,
  domain: string,
  isPrimary: boolean,
  createdAt: Date,
  updatedAt: Date,
|};

export type SocialConnection = {
  socialMediaType: string,
  pageId: string,
}

export type SocialConnections = Array<SocialConnection>;

export type SiteDomains = Array<SiteDomain>;

type BlogStatus = 'published'|'draft';

export type BlogConfig = {|
  wordCloudEnabled: boolean,
  defaultPostStatuses: {
    newListing: BlogStatus,
    thisOldHouse: BlogStatus,
    updatedListing: BlogStatus,
    generalInterest: BlogStatus,
  },
  TOHAndGiPostDayOfWeek?: number,
|};

export type Site = {|
  id: number,
  siteDomain: SiteDomain,
  crm: CRM,
  dataSource: DataSource,
  siteType: 'agent'|'team'|'office'|'broker',
  productType: 'idx'|'dms'|'social'|'idx-free', // IDX, DMS, Social, IDX free
  uiConfig?: Object,
  domainMetadata?: Object,
  createdAt?: Date,
  updatedAt?: Date,
  googleAnalytics?: string,
  blogConfig?: Object,
  videoConfig?: Object,
|};

export type SiteOwner = {|
  id: number,
  siteId: number,
  firstName: string,
  lastName: string,
  email: string,
  cellPhone: string,
  photo: string,
  createdAt: Date,
  updatedAt: Date,
|};

export type SiteOffice = {|
  id: number,
  siteId: number,
  logo: string,
  name: string,
  officePhone: string,
  streetAddress1: string,
  streetAddress2: string,
  city: string,
  state: string,
  zipCode: string,
  createdAt: Date,
  updatedAt: Date,
  mlsSubscriptions: MLSSubscriptions,
  homepageBio: string,
  email: string,
|};

export type AxiosRequest = {|
  url: string,
  method: 'GET'|'POST'|'DELETE'|'PUT',
  data?: Object,
  debug?: any,
|};

export type AxiosResponse = {
  status: number,
  response: {
    data: {
      error?: {
        message: string,
      },
    },
  },
};

type Change = {|
  oldValue: string,
  newValue: string,
  fieldName: string,
  feedResourceId: number,
  createdAt: Date,
  ckId: number,
|};
type Changes = Array<Change>;

// minimal listing
export type Listing = {
  id: number,
  address: string,
  city: string,
  state: string,
  zipCode: string,
  status: string,
  type: string,
  subtype: string,
  bedrooms: string,
  price: string,
  baths: string,
  sqft: string,
  lotSize: string,
  firstImage: string,
  mlsListingId: string,
  fullAddress: string,
  dateListed: Date,
  lastModified: Date,
  changes: Changes,
};
export type Listings = Array<Listing>;

// Standardized Response From Any Listing API Request
export type ListingResponse = {
  listings: Listings,
  count: null|number,
  formattedCount: null|string,
};

export type LeadEmailPreferencesPayload = {
  leadId: number,
  notifyChangesToFavorites: boolean,
  notifyNewUpdatedListings: boolean,
  notifyCompetingListings: boolean,
};

export type LeadEmailPreferences = {
  id: number,
  leadId: number,
  notifyChangesToFavorites: boolean,
  notifyNewUpdatedListings: boolean,
  notifyCompetingListings: boolean,
  globallyUnsubscribedAt: Date,
  createdAt: Date,
  updatedAt: Date,
};

export type LeadPhoneNumberPayload = {
  leadId: number,
  phone: string,
};

export type LeadPhoneNumber = {
  id: number,
  leadId: number,
  phone: string,
  label: string,
  extension: string,
  canReceiveTextMessages: boolean,
  isPrimary: boolean,
  createdAt: Date,
};

export type Lead = {
  id: number,
  firstName: string,
  lastName: string,
  createdAt?: Date,
  updatedAt?: Date,
  type?: 'buyer'|'seller'|'buyer/seller'|'renter'|'',
  preferredContactMethod?: string,

  minPrice: number,
  maxPrice: number,

  sellerMlsListingId: null|string,

  streetAddress1: string,
  streetAddress2: string,
  city: string,
  state: string,
  zipCode: string,

  remoteId: string,

  leadEmailPreferences?: LeadEmailPreferences,
  leadPhoneNumber?: LeadPhoneNumber,

  listingTypes?: 'singlefamily'|'condo'|'townhouse'|'commercial'|'land'|'mobile'|'multifamily'|'businessopportunity'|'',
  workingWithOtherAgent?: boolean,
  timeframeStartDate?: Date,
};

export type CurrentUser = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  lead: Lead,
};

export type LeadListingActionPayload = {|
  action: 'favorited'|'unfavorited'|'viewed'|'hid'|'unhid',
  mlsListingId: number,
  site: Site,
  user: CurrentUser,
|};

export type Req = {|
  body: Object,
  query: Object,
  params: Object,
  user: CurrentUser,
  assert: (string, string) => {
    isInt: Function,
  },
  flash: ('success'|'info'|'error'|'warning', Array<string>|string) => Req,
|};

export type Res = {|
  send: (any) => Res,
  status: (number) => Res,
  render: (string, ?Object) => Res,
  locals: Object,
  redirect: (string) => Res,
|};

export type SearchOpts = {|
  filters: Object,
  currentUser?: ?CurrentUser,
  returnCount?: boolean,
  timeout?: number,
  site: Site,
  columns?: Array<string>,
|};

export type SavedSearchPayload = {|
  leadId: number,
  name: string,
  attributes: Object,
|};

export type SavedSearchAttribute = {|
  id: number,
  leadSavedSearchId: number,
  attributeKey: string,
  attributeValue: any,
|};

export type SavedSearch = {|
  leadId: number,
  name: string,
  searchParameters: Object,
  remoteId: string,
  shouldReceiveNotifications: boolean,
|};

export type DeleteSavedSearchPayload = {|
  user: CurrentUser,
  site: Site,
  savedSearch: SavedSearch,
|};

export type UpdateSavedSearch = {
  id: number,
  shouldReceiveNotifications: boolean,
};

export type SavedSearches = Array<SavedSearch>;

export type ListingDetail = Object;
export type ListingDetailResponse = {
  similarListings: ListingResponse,
  areaSales: ListingResponse,
  listing: ListingDetail,
};

export type EntityIds = Array<number>;
export type NewBlogContent = {|
  siteId: number,
  newListingIds: EntityIds,
  updatedListingIds: EntityIds,
  newTOHIds: EntityIds,
  internallWrittenIds: EntityIds,
|};

export type TOHArticle = {
  contentid : string,
  title : string,
  intro : string,
  image : string,
  link : string,
};

export type TOHArticles = Array<TOHArticle>;

export type GeoJSON = Array<{|
  type: string,
  coordinates: Array<Array<Array<Array<number>>>>,
|}>;

export type MapMarker = {|
  label: string,
  lat: string,
  lng: string,
  id: number,
  firstPhoto: string,
|};
export type MapMarkers = Array<MapMarker>;

export type GIArticle = {
  id: number,
  shortDescription: string,
  image: string,
  tags: Array<string>,
};

export type GIArticles = Array<GIArticle>;

export type YouTubeMetadata = {|
  description: string,
  categoryId?: string,
  title: string,
  tags: Array<string>,
  thumbnail?: string,
  publicUrl: string,
  privacyStatus?: string,
|};

export type MlsFeed = {|
  id: number,
  name: string,
|};
export type MlsFeeds = Array<MlsFeed>;


type VideoStorageStatus = 'upload-not-started'|'pending'|'uploaded'|'deleted';
type VideoPostStatus = 'published'|'draft'|'deleted'|'republished';
type YTVideoStatus = 'pending'|'uploaded'|'error';

export type VideoPost = {|
  id: number,
  siteId: number,
  entityType: string,
  entityId: number,
  assets: Array<Object>,
  slideDurationInSeconds: number,
  songUrl: string,
  title: string,
  description: string,
  tags: Array<string>,
  storageUrl: string,
  storageStatus: VideoStorageStatus,
  youtubeId: string,
  youtubeStatus: YTVideoStatus,
  status: VideoPostStatus,
  createdAt: Date,
  updatedAt: Date,
|};
export type VideoPosts = Array<VideoPost>;
export type TransformedVideoPost = {|
  id: number,
  siteId: number,
  entityType: string,
  entityId: number,
  assets: Array<Object>,
  slideDurationInSeconds: number,
  songUrl: string,
  title: string,
  description: string,
  tags: Array<string>,
  storageUrl: string,
  storageStatus: VideoStorageStatus,
  youtubeId: string,
  youtubeStatus: YTVideoStatus,
  status: VideoPostStatus,
  createdAt: Date,
  updatedAt: Date,
  createdAtFormatted: string,
  updatedAtFormatted: string,
|};
export type TransformedVideoPosts = Array<TransformedVideoPost>;

export type ContactAgentOfficePayload = {|
  fromName: string,
  fromAddress: string,
  message: string,
  html: string,
|};

export type Testimonial = {|
  id: number,
  siteId: number,
  title: string,
  description: string,
  testimonialDate: string,
  createdAt: Date,
  updatedAt: Date,
|};
export type Testimonials = Array<Testimonial>;

export type TransformedTestimonial = {|
  id: number,
  siteId: number,
  title: string,
  description: string,
  testimonialDate: string,
  createdAt: Date,
  updatedAt: Date,
  createdAtFormatted: string,
  updatedAtFormatted: string,
|};
export type TransformedTestimonials = Array<TransformedTestimonial>;
