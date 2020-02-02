# How to use

## token の取得

```bash
curl -X POST https://qiita.com/api/v1/auth\?url_name\=ユーザーネーム\&password\=パスワード
```

## 以下は Python インタプリタ内で実行

```bash
>>> import qiita_controller
>>> token = 'TOKEN'
>>> id = 'ID'
>>> team = 'TEAM NAME'
>>> c = qiita_controller.QiitaController(token)
>>> post = c.get_from_post_id(id, team)
>>> c.post_qiita(post)
```
