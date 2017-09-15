# react builder

A prototype tool for Web Front End developers/designers, build react app through web editor

## Why I create this project

Before you create your react website, it's better to have a prototype to preview how it would look like. Most of the times prototype is either too ugly to understand or so pretty that costs a lot, or just no prototype at all. What if this prototype is built as easy as [sketch](https://www.sketchapp.com/), and can be used in website development. So I start this project

## Usage

```
git clone https://github.com/nextjs-boilerplate/react-builder.git
cd react-builder
npm install
npm run dev
start http://localhost:3003
```

## Features

- automic design
- editor and preview
- component nesting and html nesting
- html element attribute and style edit
- props through json config
- export react project
- automic design


### automic design

![automic design screenshot](./docs/images/atomic-design.png)

### editor and preview

Although prevew comes a little slow, better continue your work and do not wait

![editor and preview screenshot](./docs/images/editor-preview.png)

### component nesting and html nesting

Html nesting, showing tag meaning for better semantic html

![Html nesting screenshot](./docs/images/nesting1.png)

Component nesting, for component reuse

![Component nesting screenshot](./docs/images/nesting2.png)

### html element attribute and style edit and bootstrap

Add className

![Add className screenshot](./docs/images/attribute.png)

Add style

![Add style screenshot](./docs/images/style.png)

### props through json config

JSON props

![JSON props screenshot](./docs/images/json-props.png)

### export react project

Pack project and download, the exported project is based on next.js

![Pack project and download screenshot](./docs/images/project-download.png)

To run the exported project, make sure you have `Index` component in your `pages`

```
mkdir project_root
cp project.zip ./project_root/
cd project_root
unzip project.zip
rm project.zip
npm install
npm run dev
start http://localhost/
```

## scratch on youtube

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/_JzSke7zQ7c/0.jpg)](https://www.youtube.com/watch?v=_JzSke7zQ7c)

based on https://github.com/nextjs-boilerplate/next.js-boilerplate

