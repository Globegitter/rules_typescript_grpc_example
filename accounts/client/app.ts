import {grpc} from "grpc-web-client";
import {Greeter} from "../proto/api_pb_service";
// This is what we should have here but typescript complains because there is no default export
// import proto from "../proto/api_pb";
// So we have this workaround here and the use a rollup plugin to rewrite this to an es import
// at bundle time
const proto = require("../proto/api_pb");


declare const USE_TLS: boolean;
const host = USE_TLS ? "https://localhost:8081" : "http://localhost:8080";

function getBook() {
  const helloRequest = new proto.HelloRequest();
  helloRequest.setName("blabla");
  
  grpc.unary(Greeter.SayHello, {
    request: helloRequest,
    host: host,
    onEnd: res => {
      const { status, statusMessage, headers, message, trailers } = res;
      console.log("getBook.onEnd.status", status, statusMessage);
      console.log("getBook.onEnd.headers", headers);
      if (status === grpc.Code.OK && message) {
        console.log("getBook.onEnd.message", message.toObject());
      }
      console.log("getBook.onEnd.trailers", trailers);
    }
  });
}

getBook();
