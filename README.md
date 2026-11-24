# Beach Night Itacaré

Landing page estática da festa Beach Night Itacaré. HTML, CSS e JavaScript puro, sem build. Pronta para o GitHub Pages a partir da raiz da branch `main`.

Depois do merge, o site fica em [https://kauan-gattward.github.io/beachnight/](https://kauan-gattward.github.io/beachnight/).

No repositório: **Settings → Pages → Deploy from a branch → `main` → `/ (root)`**.

## Próxima edição

Abra `js/main.js`. O objeto `NEXT_EDITION`, no topo, recebe a data, o line-up, o link do ingresso e, só se o valor já for oficial, o preço.

Enquanto `dateLabel` e `lineup` estiverem vazios, a seção mostra: “Próxima edição em breve, fique ligado no Instagram”.

## WhatsApp

A variável `WHATSAPP_NUMBER` fica no mesmo arquivo. Vazia, o botão não aparece. Para mostrar, use só dígitos com DDI, por exemplo `5573999999999`.

## Fotos

Os arquivos em `assets/img/` estão em WebP, com JPG de reserva, largura máxima de 1600px. A foto principal do hero também tem versões de 800px e 1200px.

## Créditos

Site por [Kauan Gattward](https://kauan-gattward.github.io/portfolio/).
