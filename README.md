![Time Badge](https://hackatime.hackclub.com/api/v1/badge/U080TNHKK32/CLDWare/schoolbox-frontend)

# 🎒SchoolBox Frontend
(geen vragen stellen over de rugzak emoij, ik kon niks anders bedenken)

### Stack
- [Deno](https://deno.com/)
- [Preact](https://preactjs.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
(links naar de websites)

### Setup
```bash
deno install
```
Om frontend te gebruiken moet je de backend ook hebben, maar dat is niet mijn probleem om docs over te schrijven

### Dev
```bash
deno task dev

caddy start
```
Hierna kan je [localhost:8000](http://localhost:8000) bezoeken

### Production
Uhh ja idk, ik kom hier later wel op terug
```bash
deno task build
deno task preview

caddy start
```