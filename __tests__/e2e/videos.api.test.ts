import request from 'supertest'
import {app, db, HTTP_STATUSES} from "../../src"

describe('/videos', () => {
    it('should return 200 and object h01.Video', async () => {
        await request(app)
            .get('/videos')
            .expect(HTTP_STATUSES.OK_200, db.videos)
    })
})
