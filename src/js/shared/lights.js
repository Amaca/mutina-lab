/* jshint esversion: 6 */

const LightsDefaultOptions = {
	selector: '#canvas1',
	diffuse: 'img/image.jpg',
	normal: 'img/image_bg.jpg',
}

export default class Lights {

	constructor(options) {
		Object.assign(this, LightsDefaultOptions);
		if (options) {
			Object.assign(this, options);
		}
		this.canvas = document.querySelector(this.selector);

		this.canvas.addEventListener('click', () => {
			console.log(this.allLights);
		})

		const viewWidth = 1400;
		const viewHeight = 795;

		this.renderer = new PIXI.WebGLRenderer(viewWidth, viewHeight, {
			view: this.canvas
		});

		this.stage = new PIXI.Container();
		const lightHeight = 250;
		this.allLights = [];

		const dirLight = new PIXI.lights.DirectionalLight({
			color: 0xffffff,
			brightness: 0.3,
			ambientColor: 0x888888,
			ambientBrightness: 1,
			position: {
				x: 0,
				y: 0,
				z: lightHeight,
			},
			target: {
				x: 0,
				y: 0,
				z: 0,
			}
		});

		const mouseLight = new PIXI.lights.PointLight({
			color: 0xffffff,
			brightness: 0.4,
			position: {
				x: viewWidth / 2,
				y: viewHeight / 2,
				z: lightHeight,
			}
		});

		this.allLights.push(dirLight);
		this.allLights.push(mouseLight);
		const loader = new PIXI.loaders.Loader();
		loader
			.add('diffuse', this.diffuse)
			.add('normal', this.normal)
			//.add('bg_diffuse', '../img/image.jpg')
			// .add('bg_normal', '../img/image_bg.jpg')
			.load((loader, res) => {
				//let bg = new PIXI.Sprite(res.bg_diffuse.texture);
				//stage.addChild(bg);

				const sprite = new PIXI.Sprite(res.diffuse.texture);

				sprite.position.set(0, 0);
				sprite.scale.set(1, 1);

				dirLight.target.x = sprite.x;
				dirLight.target.y = sprite.y;
				dirLight.updateDirection();

				//bg.normalTexture = res.bg_normal.texture;
				sprite.normalTexture = res.normal.texture;

				//bg.pluginName = "lightSprite";
				sprite.pluginName = "lightSprite";

				//bg.lights = allLights;
				sprite.lights = this.allLights;

				this.stage.addChild(sprite);

				this.canvas.addEventListener('mousemove', function(e) {
					const rect = e.target.getBoundingClientRect();

					mouseLight.position.x = e.clientX - rect.left;
					mouseLight.position.y = e.clientY - rect.top;
				});

				this.animate();
			});
	}

	animate() {
		requestAnimationFrame(() => {
			this.animate();
		});
		this.renderer.render(this.stage);
	}
}
