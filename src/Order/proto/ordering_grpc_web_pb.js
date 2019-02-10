/**
 * @fileoverview gRPC-Web generated client stub for server
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.server = require('./ordering_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.server.OrderingClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.server.OrderingPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.server.OrderingClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.server.OrderingClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.server.CreateOrderRequest,
 *   !proto.server.CreateOrderResponse>}
 */
const methodInfo_Ordering_CreateOrder = new grpc.web.AbstractClientBase.MethodInfo(
  proto.server.CreateOrderResponse,
  /** @param {!proto.server.CreateOrderRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.CreateOrderResponse.deserializeBinary
);


/**
 * @param {!proto.server.CreateOrderRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.server.CreateOrderResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.CreateOrderResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.OrderingClient.prototype.createOrder =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.Ordering/CreateOrder',
      request,
      metadata,
      methodInfo_Ordering_CreateOrder,
      callback);
};


/**
 * @param {!proto.server.CreateOrderRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.CreateOrderResponse>}
 *     The XHR Node Readable Stream
 */
proto.server.OrderingPromiseClient.prototype.createOrder =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.createOrder(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.server.SendOrderRequest,
 *   !proto.server.SendOrderResponse>}
 */
const methodInfo_Ordering_SendOrder = new grpc.web.AbstractClientBase.MethodInfo(
  proto.server.SendOrderResponse,
  /** @param {!proto.server.SendOrderRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.SendOrderResponse.deserializeBinary
);


/**
 * @param {!proto.server.SendOrderRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.server.SendOrderResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.SendOrderResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.OrderingClient.prototype.sendOrder =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.Ordering/SendOrder',
      request,
      metadata,
      methodInfo_Ordering_SendOrder,
      callback);
};


/**
 * @param {!proto.server.SendOrderRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.SendOrderResponse>}
 *     The XHR Node Readable Stream
 */
proto.server.OrderingPromiseClient.prototype.sendOrder =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.sendOrder(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.server.AddOrderItemRequest,
 *   !proto.server.AddOrderItemResponse>}
 */
const methodInfo_Ordering_AddOrderItem = new grpc.web.AbstractClientBase.MethodInfo(
  proto.server.AddOrderItemResponse,
  /** @param {!proto.server.AddOrderItemRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.AddOrderItemResponse.deserializeBinary
);


/**
 * @param {!proto.server.AddOrderItemRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.server.AddOrderItemResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.AddOrderItemResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.OrderingClient.prototype.addOrderItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.Ordering/AddOrderItem',
      request,
      metadata,
      methodInfo_Ordering_AddOrderItem,
      callback);
};


/**
 * @param {!proto.server.AddOrderItemRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.AddOrderItemResponse>}
 *     The XHR Node Readable Stream
 */
proto.server.OrderingPromiseClient.prototype.addOrderItem =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.addOrderItem(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.server.RemoveOrderItemRequest,
 *   !proto.server.RemoveOrderItemResponse>}
 */
const methodInfo_Ordering_RemoveOrderItem = new grpc.web.AbstractClientBase.MethodInfo(
  proto.server.RemoveOrderItemResponse,
  /** @param {!proto.server.RemoveOrderItemRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.RemoveOrderItemResponse.deserializeBinary
);


/**
 * @param {!proto.server.RemoveOrderItemRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.server.RemoveOrderItemResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.RemoveOrderItemResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.OrderingClient.prototype.removeOrderItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.Ordering/RemoveOrderItem',
      request,
      metadata,
      methodInfo_Ordering_RemoveOrderItem,
      callback);
};


/**
 * @param {!proto.server.RemoveOrderItemRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.RemoveOrderItemResponse>}
 *     The XHR Node Readable Stream
 */
proto.server.OrderingPromiseClient.prototype.removeOrderItem =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.removeOrderItem(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.server.ReceiveOrderItemRequest,
 *   !proto.server.ReceiveOrderItemResponse>}
 */
const methodInfo_Ordering_ReceiveOrderItem = new grpc.web.AbstractClientBase.MethodInfo(
  proto.server.ReceiveOrderItemResponse,
  /** @param {!proto.server.ReceiveOrderItemRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.ReceiveOrderItemResponse.deserializeBinary
);


/**
 * @param {!proto.server.ReceiveOrderItemRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.server.ReceiveOrderItemResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.ReceiveOrderItemResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.OrderingClient.prototype.receiveOrderItem =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.Ordering/ReceiveOrderItem',
      request,
      metadata,
      methodInfo_Ordering_ReceiveOrderItem,
      callback);
};


/**
 * @param {!proto.server.ReceiveOrderItemRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.ReceiveOrderItemResponse>}
 *     The XHR Node Readable Stream
 */
proto.server.OrderingPromiseClient.prototype.receiveOrderItem =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.receiveOrderItem(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.server.ModifyRequestedQuantityRequest,
 *   !proto.server.ModifyRequestedQuantityResponse>}
 */
const methodInfo_Ordering_ModifyRequestedQuantity = new grpc.web.AbstractClientBase.MethodInfo(
  proto.server.ModifyRequestedQuantityResponse,
  /** @param {!proto.server.ModifyRequestedQuantityRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.ModifyRequestedQuantityResponse.deserializeBinary
);


/**
 * @param {!proto.server.ModifyRequestedQuantityRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.server.ModifyRequestedQuantityResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.ModifyRequestedQuantityResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.OrderingClient.prototype.modifyRequestedQuantity =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.Ordering/ModifyRequestedQuantity',
      request,
      metadata,
      methodInfo_Ordering_ModifyRequestedQuantity,
      callback);
};


/**
 * @param {!proto.server.ModifyRequestedQuantityRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.ModifyRequestedQuantityResponse>}
 *     The XHR Node Readable Stream
 */
proto.server.OrderingPromiseClient.prototype.modifyRequestedQuantity =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.modifyRequestedQuantity(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.server.FindOrderRequest,
 *   !proto.server.FindOrderResponse>}
 */
const methodInfo_Ordering_FindOrder = new grpc.web.AbstractClientBase.MethodInfo(
  proto.server.FindOrderResponse,
  /** @param {!proto.server.FindOrderRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.FindOrderResponse.deserializeBinary
);


/**
 * @param {!proto.server.FindOrderRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.server.FindOrderResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.FindOrderResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.OrderingClient.prototype.findOrder =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.Ordering/FindOrder',
      request,
      metadata,
      methodInfo_Ordering_FindOrder,
      callback);
};


/**
 * @param {!proto.server.FindOrderRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.FindOrderResponse>}
 *     The XHR Node Readable Stream
 */
proto.server.OrderingPromiseClient.prototype.findOrder =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.findOrder(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.server.FindProjectOrderDatesRequest,
 *   !proto.server.FindProjectOrderDatesResponse>}
 */
const methodInfo_Ordering_FindProjectOrderDates = new grpc.web.AbstractClientBase.MethodInfo(
  proto.server.FindProjectOrderDatesResponse,
  /** @param {!proto.server.FindProjectOrderDatesRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.FindProjectOrderDatesResponse.deserializeBinary
);


/**
 * @param {!proto.server.FindProjectOrderDatesRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.server.FindProjectOrderDatesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.FindProjectOrderDatesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.OrderingClient.prototype.findProjectOrderDates =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/server.Ordering/FindProjectOrderDates',
      request,
      metadata,
      methodInfo_Ordering_FindProjectOrderDates,
      callback);
};


/**
 * @param {!proto.server.FindProjectOrderDatesRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.FindProjectOrderDatesResponse>}
 *     The XHR Node Readable Stream
 */
proto.server.OrderingPromiseClient.prototype.findProjectOrderDates =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.findProjectOrderDates(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.server;

