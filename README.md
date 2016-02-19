# texture-maps

My [Van Gogh Map](http://mapmeld.github.io/van-gogh-map/#5.12/43.218/-71.686) has always had a couple of empty
dropdowns in it.

Originally I was hoping to upload textures from different artists and let people pick and choose. That ended up being
more complex than I like (it definitely requires a server, database, server-side image manipulation, and file storage). Revisiting it for texture-maps, you can now use given textures or upload your own.

## Usage

Installation requires NodeJS, MongoDB, a Cloudinary account, and cairo for image manipulation

```
git clone https://github.com/mapmeld/texture-maps.git
cd texture-maps
npm install
node app.js
```

## License

Open source, MIT license
