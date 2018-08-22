# rules_typescript GRPC Template

This sets up a dummy grpc server (without grpc-web support) and a grpc-web test client. To get the client to make a successful request https://github.com/improbable-eng/grpc-web/tree/master/go/grpcwebproxy is needed to run in front of the grpc service. All code is built/run using bazel.


To start the backend run:
```
bazel run //accounts
```
To install & start the grpc-web proxy run (might have to manually work around https://github.com/improbable-eng/grpc-web/issues/174):
```
go get -u github.com/improbable-eng/grpc-web/go/grpcwebproxy
cd $GOPATH/src/github.com/improbable-eng/grpc-web/go/grpcwebproxy
$GOPATH/bin/grpcwebproxy \
    --server_tls_cert_file=../../misc/localhost.crt \
    --server_tls_key_file=../../misc/localhost.key \
    --backend_addr=localhost:9090 \
    --backend_tls_noverify
```
Finally start the frotend, open `localhost:8081` check the browser console:
```
bazel run //accounts/client:prodserver
```

Note: I had to do quite some hacks to get this to work and currently it does not work with `ts_devserver` but only with `rollup_bundle` and the prodserver.
