# react builder

A prototype tool for Web Front End developers/designers, build react app through web editor

## Why I create this project

Before you create your react website, it's better to have a prototype to preview how it would look like. Most of the times prototype is either too ugly to understand or so pretty that costs a lot, or just no prototype at all. What if this prototype is built as easy as [sketch](https://www.sketchapp.com/), and can be used in website development. So I start this project

## Usage

```
git clone https://github.com/postor/react-builder.git
cd react-builder
npm install
npm run dev
start http://localhost:3008
```

## Features

- automic design
- editor and preview
- component nesting and html nesting
- html element attribute and style edit
- props through json config
- export react project
- passing prop to component
- if/loop/custom logic 


### automic design

![automic design screenshot](./images/atomic-design.png)

### editor and preview

Although prevew comes a little slow, better continue your work and do not wait

![editor and preview screenshot](./images/editor-preview.png)

### component nesting and html nesting

Html nesting, showing tag meaning for better semantic html

![Html nesting screenshot](./images/nesting1.png)

Component nesting, for component reuse

![Component nesting screenshot](./images/nesting2.png)

### html element attribute and style edit and bootstrap

Add className

![Add className screenshot](./images/attribute.png)

Add style

![Add style screenshot](./images/style.png)

### props through json config

JSON props

![JSON props screenshot](./images/json-props.png)

### export react project

Pack project and download, the exported project is based on [next.js](https://github.com/zeit/next.js/)

![Pack project and download screenshot](./images/project-download.png)

To run the exported project, make sure you have `Index` component in your `pages`

```
mkdir project_root
unzip project.zip ./project_root/
cd project_root
npm install
npm run dev
start http://localhost/
```

## scratch on youtube

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/_JzSke7zQ7c/0.jpg)](https://www.youtube.com/watch?v=_JzSke7zQ7c)

based on https://github.com/nextjs-boilerplate/next.js-boilerplate

