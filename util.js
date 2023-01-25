import { v4 } from 'uuid';
import _ from 'lodash';

const paramsRoutes = ['/abc'], bodyRoutes = [], queryRoutes = [], idString = "reqId"

export function getId(req) {
    console.log(req.path)
    if(paramsRoutes.includes(req.path)) return req.params[0].slice(1)

    if(bodyRoutes.includes(req.path)) return _.find(body, idString)[idString]

    if(queryRoutes.includes(req.path)) return req.query[idString]

    return v4()
}