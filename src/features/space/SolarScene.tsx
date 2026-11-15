import { useEffect, useRef, useState } from "react";
import * as T from "three";
import { worlds, orbits, type WorldId } from "./worlds";

function texture(world: (typeof worlds)[number]) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const data = ctx.createImageData(512, 256);
  const base = new T.Color(world.color).convertLinearToSRGB();
  const noise = (x: number, y: number) =>
    Math.sin(x + Math.sin(y * 1.8)) * Math.cos(y * 0.9 + x * 0.45) +
    Math.cos(x * 2.4 - y * 1.3) * 0.34;
  for (let y = 0; y < 256; y++)
    for (let x = 0; x < 512; x++) {
      const u = (x / 512) * Math.PI * 2,
        v = (y / 256) * Math.PI;
      const a = Math.cos(u) * Math.sin(v),
        b = Math.sin(u) * Math.sin(v),
        c = Math.cos(v);
      const n =
        noise(a * 7 + c * 5, b * 8 - c * 3) +
        0.35 * noise(b * 21 + c * 7, a * 16);
      const fine = Math.sin(x * 48.3 + y * 92.3) * 0.5 + 0.5;
      let r = base.r,
        g = base.g,
        bl = base.b;
      let amp = 0.8 + n * 0.12 + fine * 0.12;
      if (world.id === "earth") {
        const land =
          noise(a * 5 + c * 5, b * 4 - c * 2) +
          0.48 * noise(a * 11 - b * 3, c * 12 - b * 10);
        if (Math.abs(c) > 0.91 + n * 0.035) {
          r = 0.82;
          g = 0.92;
          bl = 1;
        } else if (land > 0.23) {
          r = 0.37 + n * 0.16;
          g = 0.62 + n * 0.07;
          bl = 0.38 - n * 0.07;
        }
        if (noise(a * 11 + c * 12, b * 9 - c * 8) + n * 0.3 > 0.93) {
          r = (r + 0.8) / 2;
          g = (g + 0.83) / 2;
          bl = (bl + 0.89) / 2;
        }
      } else if (
        ["jupiter", "saturn", "venus", "neptune", "uranus"].includes(world.id)
      ) {
        amp =
          1 +
          n * 0.035 +
          Math.sin(v * (world.id === "jupiter" ? 29 : 33) + n * 0.5) * 0.12 +
          Math.cos(v * 62 + n * 0.9) * 0.057;
        if (
          world.id === "jupiter" &&
          ((x - 325) / 34) ** 2 + ((y - 153) / 10) ** 2 < 1
        ) {
          r = 0.88;
          g = 0.51;
          bl = 0.35;
        }
      } else if (world.id === "sun") {
        amp = 0.95 + n * 0.14 + fine * 0.08;
      }
      const i = (y * 512 + x) * 4;
      data.data[i] = 255 * r * amp;
      data.data[i + 1] = 255 * g * amp;
      data.data[i + 2] = 255 * bl * amp;
      data.data[i + 3] = 255;
    }
  ctx.putImageData(data, 0, 0);
  const result = new T.CanvasTexture(canvas);
  result.colorSpace = T.SRGBColorSpace;
  return result;
}
interface Props {
  selected: WorldId;
  mode: "system" | "detail";
  playing: boolean;
  speed: number;
  view: { yaw: number; pitch: number; zoom: number };
  reset: number;
  onPick: (id: WorldId) => void;
}
export default function SolarScene(props: Props) {
  const node = useRef<HTMLDivElement>(null);
  const state = useRef(props);
  useEffect(() => {
    state.current = props;
  }, [props]);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const host = node.current!;
    let renderer: T.WebGLRenderer;
    try {
      renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setFailed(true);
      return;
    }
    host.appendChild(renderer.domElement);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
    const scene = new T.Scene(),
      camera = new T.PerspectiveCamera(42, 1, 0.1, 300);
    const sphere = new T.SphereGeometry(1, 40, 28);
    scene.add(new T.AmbientLight(0xb6caff, 1.05));
    const sunLight = new T.PointLight(0xffdeae, 180, 0, 1.4);
    scene.add(sunLight);
    const keyLight = new T.DirectionalLight(0xffe2bf, 2.4);
    keyLight.position.set(-5, 6, 7);
    scene.add(keyLight);
    const system = new T.Group(),
      close = new T.Group();
    scene.add(system, close);
    const paths = new T.Group();
    system.add(paths);
    orbits.slice(1).forEach((radius) => {
      const pts = Array.from(
        { length: 100 },
        (_, i) =>
          new T.Vector3(
            Math.cos((i / 100) * Math.PI * 2) * radius,
            0,
            Math.sin((i / 100) * Math.PI * 2) * radius,
          ),
      );
      paths.add(
        new T.LineLoop(
          new T.BufferGeometry().setFromPoints(pts),
          new T.LineBasicMaterial({
            color: 0x6975a2,
            transparent: true,
            opacity: 0.27,
          }),
        ),
      );
    });
    const tex = worlds.map(texture);
    const build = (
      world: (typeof worlds)[number],
      i: number,
      radius: number,
    ) => {
      const group = new T.Group();
      const material =
        world.id === "sun"
          ? new T.MeshBasicMaterial({ map: tex[i] })
          : new T.MeshStandardMaterial({ map: tex[i], roughness: 0.89 });
      const mesh = new T.Mesh(sphere, material);
      mesh.scale.setScalar(radius);
      mesh.userData.world = world.id;
      group.add(mesh);
      if (world.id === "sun") {
        const glowCanvas = document.createElement("canvas");
        glowCanvas.width = glowCanvas.height = 64;
        const cx = glowCanvas.getContext("2d")!,
          g = cx.createRadialGradient(32, 32, 0, 32, 32, 32);
        g.addColorStop(0, "rgba(255,186,94,.75)");
        g.addColorStop(0.4, "rgba(255,147,60,.44)");
        g.addColorStop(1, "rgba(255,117,46,0)");
        cx.fillStyle = g;
        cx.fillRect(0, 0, 64, 64);
        const glow = new T.Sprite(
          new T.SpriteMaterial({
            map: new T.CanvasTexture(glowCanvas),
            transparent: true,
            depthWrite: false,
            blending: T.AdditiveBlending,
          }),
        );
        glow.scale.setScalar(radius * 5);
        group.add(glow);
      }
      if (world.id === "saturn" || world.id === "uranus") {
        const ring = new T.Group();
        ring.rotation.x = world.id === "saturn" ? 1.13 : 0.22;
        ring.rotation.z = 0.22;
        for (let k = 0; k < 6; k++)
          ring.add(
            new T.Mesh(
              new T.RingGeometry(
                radius * (1.27 + k * 0.115),
                radius * (1.36 + k * 0.115),
                80,
              ),
              new T.MeshBasicMaterial({
                color: k % 2 ? 0xa58e7b : 0xd8bc8e,
                opacity: world.id === "uranus" ? 0.25 : 0.69 - k * 0.05,
                transparent: true,
                side: T.DoubleSide,
                depthWrite: false,
              }),
            ),
          );
        group.add(ring);
      }
      return { group, mesh };
    };
    const planets = worlds.map((w, i) => {
      const body = build(w, i, w.size);
      system.add(body.group);
      return body;
    });
    const details = worlds.map((w, i) => {
      const body = build(w, i, 2.1);
      close.add(body.group);
      return body;
    });
    const focus = new T.Mesh(
      new T.RingGeometry(1, 1.035, 68),
      new T.MeshBasicMaterial({
        color: 0x83cfff,
        side: T.DoubleSide,
        transparent: true,
        opacity: 0.72,
      }),
    );
    focus.rotation.x = -Math.PI / 2;
    system.add(focus);
    const positions = new Float32Array(420 * 3);
    for (let i = 0; i < 420; i++) {
      const angle = i * 2.39996,
        y = 1 - (2 * (i + 0.5)) / 420,
        r = Math.sqrt(1 - y * y);
      positions.set(
        [Math.cos(angle) * r * 85, y * 85, Math.sin(angle) * r * 85],
        i * 3,
      );
    }
    const starGeo = new T.BufferGeometry();
    starGeo.setAttribute("position", new T.BufferAttribute(positions, 3));
    scene.add(
      new T.Points(
        starGeo,
        new T.PointsMaterial({
          color: 0xa3bbef,
          size: 0.17,
          transparent: true,
          opacity: 0.65,
        }),
      ),
    );
    let dirty = true;
    const resize = () => {
      dirty = true;
      const w = host.clientWidth,
        h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    let yaw = 0,
      pitch = 0,
      drag: { x: number; y: number; dist: number } | null = null;
    const pointerDown = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY, dist: 0 };
      renderer.domElement.setPointerCapture(e.pointerId);
    };
    const pointerMove = (e: PointerEvent) => {
      if (!drag) return;
      const x = e.clientX - drag.x,
        y = e.clientY - drag.y;
      drag.dist += Math.abs(x) + Math.abs(y);
      dirty = true;
      yaw -= x * 0.007;
      pitch += y * 0.006;
      drag.x = e.clientX;
      drag.y = e.clientY;
    };
    const pointerUp = (e: PointerEvent) => {
      if (drag && drag.dist < 7 && state.current.mode === "system") {
        const rect = host.getBoundingClientRect();
        const ray = new T.Raycaster();
        ray.setFromCamera(
          new T.Vector2(
            ((e.clientX - rect.left) / rect.width) * 2 - 1,
            1 - ((e.clientY - rect.top) / rect.height) * 2,
          ),
          camera,
        );
        const hit = ray.intersectObjects(planets.map((x) => x.mesh))[0];
        if (hit) state.current.onPick(hit.object.userData.world as WorldId);
      }
      drag = null;
    };
    const pointerCancel = () => {
      drag = null;
    };
    renderer.domElement.addEventListener("pointerdown", pointerDown);
    renderer.domElement.addEventListener("pointermove", pointerMove);
    renderer.domElement.addEventListener("pointerup", pointerUp);
    renderer.domElement.addEventListener("pointercancel", pointerCancel);
    const lost = (e: Event) => {
      e.preventDefault();
      setFailed(true);
    };
    const restored = () => {
      dirty = true;
      setFailed(false);
    };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    renderer.domElement.addEventListener("webglcontextrestored", restored);
    let frame = 0,
      t = 0,
      spin = 0,
      last = 0;
    let visible = true;
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      dirty = true;
    });
    visibility.observe(host);
    let previous: Props | undefined;
    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || renderer.getContext().isContextLost()) return;
      const current = state.current;
      const { mode, selected, playing, speed, view, reset } = current;
      if (!playing && !dirty && current === previous) return;
      if (previous?.reset !== reset) {
        yaw = 0;
        pitch = 0;
      }
      dirty = false;
      previous = current;
      if (playing) {
        t += delta * speed;
        spin += delta * 0.34;
      }
      const index = worlds.findIndex((w) => w.id === selected);
      system.visible = mode === "system";
      close.visible = !system.visible;
      sunLight.visible = system.visible;
      keyLight.visible = !system.visible;
      if (system.visible) {
        planets.forEach(({ group, mesh }, i) => {
          if (!i || i === 10) return;
          const a = i * 2.14 + (t * 0.53) / Math.sqrt(worlds[i].years || 1);
          group.position.set(
            orbits[i] * Math.cos(a),
            0,
            orbits[i] * Math.sin(a),
          );
          mesh.rotation.y = spin;
        });
        planets[10].group.position
          .copy(planets[3].group.position)
          .add(
            new T.Vector3(
              Math.cos(t * 1.5) * 0.63,
              0.11,
              Math.sin(t * 1.5) * 0.63,
            ),
          );
        focus.position.copy(planets[index].group.position);
        focus.scale.setScalar(worlds[index].size + 0.21);
      } else
        details.forEach(({ group, mesh }, i) => {
          group.visible = i === index;
          mesh.rotation.y = spin;
        });
      const angle = yaw + view.yaw,
        elevation = T.MathUtils.clamp(
          (system.visible ? 0.98 : 0.34) + pitch + view.pitch,
          -1.43,
          1.43,
        );
      const distance =
        (system.visible
          ? Math.max(43, 35 / camera.aspect)
          : Math.max(8.8, 8 / camera.aspect)) / view.zoom;
      camera.position.set(
        Math.sin(angle) * Math.cos(elevation) * distance,
        Math.sin(elevation) * distance,
        Math.cos(angle) * Math.cos(elevation) * distance,
      );
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      const materials = new Set<T.Material>(),
        geometries = new Set<T.BufferGeometry>(),
        textures = new Set<T.Texture>();
      scene.traverse((obj) => {
        if ("geometry" in obj) geometries.add(obj.geometry as T.BufferGeometry);
        if ("material" in obj) materials.add(obj.material as T.Material);
      });
      for (const mat of materials) {
        if ("map" in mat && mat.map instanceof T.Texture) textures.add(mat.map);
        mat.dispose();
      }
      textures.forEach((x) => x.dispose());
      geometries.forEach((x) => x.dispose());
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      renderer.domElement.removeEventListener("webglcontextrestored", restored);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <div className="space-scene" ref={node} aria-hidden="true">
      {failed && (
        <div className="space-scene-fallback">
          <div
            style={
              {
                "--world-color": worlds.find((w) => w.id === props.selected)
                  ?.color,
              } as React.CSSProperties
            }
          />
          <p>Previzualizare 2D · WebGL indisponibil</p>
        </div>
      )}
    </div>
  );
}
