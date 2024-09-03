# SISTEMA-PDV

LINK DO DEPLOY DO PROJETO: https://sistema-pdv-nu.vercel.app/

# Projeto - Backend

## **Banco de dados**

Banco de Dados PostgreSQL chamado `pdv`.

<details>
<summary>1ª Sprint</summary>
<br>

<details>
<summary><b>Banco de Dados</b></summary>
<br>

- usuarios
  - id
  - nome
  - email (campo único)
  - senha
- categorias
  - id
  - descricao

</details>

<details>
<summary><b>Listar categorias</b></summary>

#### `GET` `/categoria`

Essa é a rota que será chamada quando o usuário quiser listar todas as categorias cadastradas.

## **Categorias**

- Informática
- Celulares
- Beleza e Perfumaria
- Mercado
- Livros e Papelaria
- Brinquedos
- Moda
- Bebê
- Games

</details>

<details>
<summary><b>Cadastrar usuário</b></summary>

#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuário no sistema.

```javascript
// POST /usuario
{
    "nome" : "jose"
    "email": "jose@email.com",
    "senha": "teste1234"
}
```

</details>

<details>
<summary><b>Efetuar login do usuário</b></summary>

#### `POST` `/login`

Essa é a rota que permite o usuário cadastrado realizar o login no sistema.

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "teste1234"
}
```

</details>

---

<details>
<summary><b>Detalhar perfil do usuário logado</b></summary>

#### `GET` `/usuario`

Essa é a rota que permite o usuário logado a visualizar os dados do seu próprio perfil, de acordo com a validação do token de autenticação.

```javascript
// GET /usuario
{
    "id" : 1
    "nome": "jose",
    "email": "jose@email.com"
}
```

</details>

<details>
<summary><b>Editar perfil do usuário logado</b></summary>

#### `PUT` `/usuario`

Essa é a rota que permite o usuário logado atualizar informações de seu próprio cadastro, **_de acordo com a validação do token de autenticação_**.

```javascript
// PUT /usuario
{
    "nome" : "jose"
    "email": "jose@email.com",
    "senha": "teste1234"
}
```

</details>

</details>

</details>

---

<details>
<summary>2ª Sprint</summary>
<br>

<details>
<summary><b>Banco de Dados</b></summary>
<br>

- produtos
  - id
  - descricao
  - quantidade_estoque
  - valor
  - categoria_id
- clientes
  - id
  - nome
  - email (campo único)
  - cpf (campo único)
  - cep
  - rua
  - numero
  - bairro
  - cidade
  - estado

</details>

<details>
<summary><b>Cadastrar Produto</b></summary>

#### `POST` `/produto`

Essa é a rota que permite o usuário logado cadastrar um novo produto no sistema.

## **Atenção**: os dados devem ser inseridos e enviados no formato **_Multipart-form-data_**

```javascript
// POST /produto

descricao: Motorola moto g7 plus
quantidade_estoque: 100
valor: 170000
categoria_id: 2
produto_imagem: -880938338.jpg

```

</details>

<details>
<summary><b>Editar dados do produto</b></summary>

#### `PUT` `/produto/:id`

Essa é a rota que permite o usuário logado a atualizar as informações de um produto cadastrado.

```javascript
// PUT /produto/1

descricao: Motorola moto g7 plus
quantidade_estoque: 80
valor: 170000
categoria_id: 2
produto_imagem: -880938338.jpg

```

</details>

<details>
<summary><b>Listar Produtos</b></summary>

#### `GET` `/produto`

Essa é a rota que será chamada quando o usuário logado quiser listar todos os produtos cadastrados.

### Sem filtro de categoria

```javascript
// GET /produto

//sem conteúdo no body da requisição
```

### Com filtro de categoria

```javascript
// GET /produto/?categoria_id=1

//sem conteúdo no body da requisição
```

</details>

<details>
<summary><b>Detalhar Produto</b></summary>

#### `GET` `/produto/:id`

Essa é a rota que permite o usuário logado obter um de seus produtos cadastrados.

```javascript
// GET /produto/:1

//sem conteúdo no body da requisição
```

</details>

<details>
<summary><b>Excluir Produto por ID</b></summary>

#### `DELETE` `/produto/:id`

Essa é a rota que será chamada quando o usuário logado quiser excluir um de seus produtos cadastrados.

```javascript
// DELETE /produto/:1

//sem conteúdo no body da requisição
```

</details>

<details>
<summary><b>Cadastrar Cliente</b></summary>

#### `POST` `/cliente`

Essa é a rota que permite usuário logado cadastrar um novo cliente no sistema.

```javascript
// POST /cliente
{
    "nome" : "Maria"
    "email": "maria@email.com",
    "cpf": "12345678910"
}
```

</details>

<details>
<summary><b>Editar dados do cliente</b></summary>

#### `PUT` `/cliente/:id`

Essa é a rota que permite o usuário realizar atualização de um cliente cadastrado.

```javascript
// PUT /cliente
{
    "nome" : "Maria"
    "email": "maria21@email.com",
    "cpf": "12345678910"
}
```

</details>

<details>
<summary><b>Listar Clientes</b></summary>

#### `GET` `/cliente`

Essa é a rota que será chamada quando o usuário logado quiser listar todos os clientes cadastrados.

```javascript
// GET /cliente

//Sem conteúdo no body da requisição
```

</details>

<details>
<summary><b>Detalhar Cliente</b></summary>

#### `GET` `/cliente/:id`

Essa é a rota que será chamada quando o usuário logado quiser obter um de seus clientes cadastrados.

```javascript
// GET /cliente/1

//Sem conteúdo no body da requisição
```

</details>

</details>

---

<details>
<summary>3ª Sprint</summary>
<br>

<details>
<summary><b>Banco de Dados</b></summary>
<br>

- pedidos
  - id
  - cliente_id
  - observacao
  - valor_total
- pedido_produtos
  - id
  - pedido_id
  - produto_id
  - quantidade_produto
  - valor_produto
- produtos - produto_imagem
</details>

---

<details>
<summary><b>Cadastrar Pedido</b></summary>

#### `POST` `/pedido`

Essa é a rota que será utilizada para cadastrar um novo pedido no sistema.

**Lembre-se:** Cada pedido deverá conter ao menos um produto vinculado.

```javascript
// POST /pedido
{
    "cliente_id": 1,
    "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
    "pedido_produtos": [
        {
            "produto_id": 1,
            "quantidade_produto": 10
        },
        {
            "produto_id": 2,
            "quantidade_produto": 20
        }
    ]
}
```

</details>

<details>
<summary><b>Listar Pedidos</b></summary>

#### `GET` `/pedido`

Essa é a rota que será chamada quando o usuário logado quiser listar todos os pedidos cadastrados.

### Sem filtro de cliente

```javascript
// GET /pedido

//sem conteúdo no body da requisição
```

### Com filtro de cliente

```javascript
// GET /pedido/?cliente_id=1

//sem conteúdo no body da requisição
```

</details>

---
