const game_engine = {
  Screen: function (canvas, pixel_width, pixel_height) {
    this.out_cnv = canvas;
    this.out_ctx = canvas.getContext("2d");
    this.out_ctx.imageSmoothingEnabled = false;

    this.src_cnv = document.createElement("canvas");
    this.src_cnv.width  = pixel_width;
    this.src_cnv.height = pixel_height;
    this.src_ctx = this.src_cnv.getContext("2d");

    this.bg_color = "red";

    this.render = function () {
      // Sanity check
      if (this.out_cnv.width < this.src_cnv.width) {
        this.out_cnv.width = this.src_cnv.width
      }
      if (this.out_cnv.height < this.src_cnv.height) {
        this.out_cnv.height = this.src_cnv.height
      }
      // Get the magnification
      let m = Math.min(
        Math.floor(this.out_cnv.width / this.src_cnv.width),
        Math.floor(this.out_cnv.height / this.src_cnv.height)
      )
      // Some other useful dimensions
      let ow  = this.out_cnv.width;
      let oh  = this.out_cnv.height;
      let sw  = this.src_cnv.width;
      let sh  = this.src_cnv.height;
      let nw = sw * m;
      let nh = sh * m;

      // Finally let's render
      this.out_ctx.fillStyle = this.bg_color;
      this.out_ctx.fillRect(0, 0, ow, oh)
      this.out_ctx.drawImage(
        this.src_cnv,
        0, 0, sw, sh,
        Math.floor(ow / 2 - nw / 2),
        Math.floor(oh / 2 - nh / 2),
        nw, nh
      )
    }
    // Placeholder function
    this.fill = function (color) {
      this.src_ctx.fillStyle = color;
      this.src_ctx.fillRect(0, 0, this.src_cnv.width, this.src_cnv.height);
    }
  }
}