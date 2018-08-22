load("@build_bazel_rules_nodejs//:defs.bzl", "nodejs_binary")

def http_server(**kwargs):

  nodejs_binary(
    node_modules = "@js_deps//:node_modules",
    entry_point = "http-server/bin/http-server",
    **kwargs)

