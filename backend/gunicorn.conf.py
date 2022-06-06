bind = '0.0.0.0:8000'
workers = 1
daemon = False
reload = True
accesslog = '-'
access_log_format ='%(h)s %(u)s %(t)s "%(r)s" %(s)s %(b)s'
errorlog = '-'
worker_class = 'gevent'
