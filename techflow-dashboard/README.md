# TechFlow Dashboard — Checkpoint 5 FrontEnd Design

## Integrantes

- Thiago Henrique Lutfi Silva — RM: 573531


## Tecnologias utilizadas

- HTML5
- Tailwind CSS
- JavaScript puro
- CSS complementar
- LocalStorage
- Media Query do sistema (`prefers-color-scheme`)

## Principais recursos implementados

- Layout Mobile-First
- Navbar responsiva
- Sidebar fixa no desktop e menu lateral no mobile
- Campo de pesquisa de projetos
- Área de usuário com dropdown
- 4 cards de indicadores
- 6 cards de projetos
- CSS Grid com `grid-cols-*`, `col-span-*` e `row-span-*`
- Uso de Flexbox
- Breakpoints `sm:`, `md:`, `lg:`, `xl:` e `2xl:`
- Estados `hover:`, `focus:`, `active:` e `disabled:`
- Uso de `group-hover:`
- Uso de `peer-checked:`
- Transições e microinterações
- Modal de cadastro de novo projeto
- Validação visual de formulário com JavaScript
- Estados de sucesso e erro
- Botão de envio desabilitado enquanto o formulário não estiver válido
- Tema Light / Dark / System
- Uso da variante `dark:` do Tailwind
- Preferência de tema salva no `localStorage`
- Modo System respeitando `prefers-color-scheme`
- Pesquisa em tempo real nos projetos

## Estrutura do projeto

```text
techflow-dashboard/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── README.md
```

## Como executar

1. Baixe ou clone o projeto.
2. Abra a pasta `techflow-dashboard`.
3. Abra o arquivo `index.html` no navegador.

Também é possível usar a extensão **Live Server** no VS Code.

> O Tailwind CSS é carregado por CDN, portanto é necessário acesso à internet para carregar o framework.

## Link do GitHub

Adicione aqui o link do repositório antes da entrega:

`https://github.com/SEU-USUARIO/techflow-dashboard`

## Dificuldades encontradas

Durante o desenvolvimento, os principais desafios foram:

- adaptar a Sidebar para funcionar de maneira diferente no mobile e no desktop;
- organizar cards com tamanhos diferentes usando CSS Grid;
- sincronizar o tema Light/Dark/System com a preferência do sistema;
- armazenar o tema escolhido no LocalStorage;
- criar feedback visual de erro e sucesso no formulário;
- manter o layout consistente em diferentes tamanhos de tela.
