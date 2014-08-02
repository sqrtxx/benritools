# -*- coding: utf-8 -*-

import doctest
import requests
from urllib.parse import urljoin
import json

class QiitaController(object):
    """
    shell での token の取得方法を help か何かで出すといい. あるいは単に QiitaController() と呼ぶと, エラー時にその情報が出るとか.
    """
    def __init__(self, token=None, user_name=None, password=None):
        self.root = 'https://qiita.com/api/v1/'
        if token is None:
            route = urljoin(self.root, 'auth')
            payload = {'url_name': user_name, 'password': password}
            r = requests.post(route, payload)
            self.token = r.json()['token']
        else:
            self.token = token

    def get_from_post_id(self, id, team=None):
        """ get post
        team: Qiita:Team name
        """
        route = urljoin(self.root, 'items/%s' % id)
        print(route)
        payload = {'token': self.token}
        post = None
        if team is None:
            r = requests.get(route, params=payload).json()
            post = {'title': r['title'], 'body': r['raw_body'], 'tags': r['tags'], 'uuid': r['uuid'], 'team': r['team_url_name']}
        else:
            payload['team_url_name'] = team
            r = requests.get(route, params=payload).json()
            post = {'title': r['title'], 'body': r['raw_body'], 'tags': r['tags'], 'uuid': r['uuid'], 'team': r['team_url_name']}
        return post

    def post_qiita(self, post):
        return self.__post(post)

    def post_team(self, post, team=None):
        if team is not None:
            return self.__post(post, team=team)

    def __post(self, post, team=None):
        """ 実際に投稿を行う関数
        安全のため外から使える投稿は post_qiita と post_team に役割を委譲している.
        """
        route = urljoin(self.root, 'items')
        payload = {'title': post['title'], 'body': post['body'], 'tags': post['tags'], 'token': self.token}
        if team is None:
            payload['confirm'] = True
            payload['private'] = False
            payload['body'] = self._embed_id(post['uuid'], post['body'], post['team'])
        else:
            payload['team_url_name'] = team
        print('payload is', payload)
        print('json dump is', json.dumps(payload))
        headers = {'content-type': 'application/json'}
        return requests.post(route, data=json.dumps(payload), headers=headers)

    def update_qiita(self, team=None):
        """ すでに Qiita に共有された投稿を Qiita:Team の投稿をもとに update する
        Qiita:Team に投稿以降に Qiita:Team で更新されている
        """
        # crawling own posts in qiita
        qiita_posts = [] # WIP
        for post in qiita_posts:
            # 最終行にある id を取得
            id = self.get_id_from_post #wip
            # id から投稿を取得し, update_posts に追加
            team_post = self.get_from_post_id(self.get_team_post_id(id), team)
            # update する
            self._update(id, team_post) # wip
        self._update(self._embed_id(id, post))

    def _update(self, id, post):
        """ update post
        """
        route = urljoin(self.root, 'items/%s' % id)
        payload = {'title': post['title'], 'body': post['body'], 'tags': post['tags'], 'token': self.token}
        payload['body'] = self._embed_id(id, post['body'], post['team'])
        requests.put(route, payload)

    def _embed_id(self, id, body, team):
        """
        >>> self._embed_id(001, "aaa", "sample")
        "aaa\n\nteam information (sample, 001)"
        """
        return body + "\n\nteam information: (%s, %s)" % (team, id)
