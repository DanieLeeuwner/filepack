# filepack

Command-line application that bundles multiple files into a single output file. Input files are added to the output file, unaltered and in the specified order.

### Installation

```shell
$ npm install -g filepack
```

### Configuration

Configuration is specified by a file named `filepack.config.js` in the current working directory.

Sample of configuration file:

```json
{
  "entry": {
    "output.js": [
      "src/file1.js",
      "src/file2.js",
      "src/file3.js",
      "src/file4.js",
      "src/file5.js"
    ],
    "output_reversed.js": [
      "src/file5.js",
      "src/file4.js",
      "src/file3.js",
      "src/file2.js",
      "src/file1.js"
    ]
  },
  "output": {
    "path": "dist"
  }
}
```

The above configuration lets filepack output two files in the `dist` directory named `output.js` and `output_reversed.js`.

### Usage

Once the configuration file has been created, filepack can be executed with the following command:

```shell
$ filepack
```

