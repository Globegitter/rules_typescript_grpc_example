const replace = require('rollup-plugin-re');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const sourcemaps = require('rollup-plugin-sourcemaps');
const {resolveBazel, notResolved, banner, onwarn, moduleDirectory} =
    require(TMPL_bazel_rollup_conf_path);

module.exports = {
  resolveBazel,
  banner,
  onwarn,
  output: {
    format: 'TMPL_output_format',
    name: 'TMPL_global_name',
  },
  plugins: [
    replace({
        replaces: {
            'USE_TLS': 'false',
            // A hack around typescript and the commonjs plugin somehow not working properly
            'const proto = require("../proto/api_pb");': 'import proto from "../proto/api_pb";',
        },
    }),
    commonjs(),
    {resolveId: resolveBazel},
    nodeResolve({
      preferBuiltins: false,
      jsnext: true,
      module: true,
      customResolveOptions: {moduleDirectory}
    }),
    {resolveId: notResolved},
    sourcemaps(),
  ]
}
