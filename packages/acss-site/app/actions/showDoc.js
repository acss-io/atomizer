import DocStore from '../stores/DocStore';

export default function (context, route, done) {
    let routeConfig = route.config || {};
    let githubPath = routeConfig.githubPath;

    if (!githubPath) {
        let err404 = new Error('Document not found');
        err404.statusCode = 404;
        return done(err404);
    }

    let pageTitle = routeConfig.pageTitle || (routeConfig.pageTitlePrefix + ' | Atomic CSS');

    // Load from cache
    let docFromCache = context.getStore(DocStore).get(githubPath);

    // is the content already in the store?
    if (docFromCache) {
        context.dispatch('RECEIVE_DOC_SUCCESS', docFromCache);
        context.dispatch('UPDATE_PAGE_TITLE', {
            pageTitle: pageTitle
        });
        return done();
    }

    // Load from service
    context.service.read('docs', {path: githubPath}, {}, function (err, data) {
        if (err) {
            return done(err);
        }

        if (!data) {
            let err404 = new Error('Document not found');
            err404.statusCode = 404;
            return done(err404);
        }

        context.dispatch('RECEIVE_DOC_SUCCESS', data);
        context.dispatch('UPDATE_PAGE_TITLE', {
            pageTitle: pageTitle
        });
        done();
    });
}
