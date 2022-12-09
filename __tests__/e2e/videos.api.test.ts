import request from 'supertest'
import {app, db, HTTP_STATUSES} from "../../src"

describe('/videos', () => {
    it('should return 200 and array objects h01.Video', async () => {
        await request(app)
            .get('/videos')
            .expect(HTTP_STATUSES.OK_200, db.videos)
    })

    let createdVideo = null
    it('should return 201 and created object h01.Video', async () => {
        const data = {
            title: 'Test',
            author: 'Unknown',
            availableResolutions: ['P144']
        }
        const createResponse = await request(app)
            .post('/videos')
            .send(data)
            .expect(HTTP_STATUSES.CREATED_201)
        createdVideo = createResponse.body
        expect(createdVideo).toEqual({
            id: expect.any(Number),
            title: "Test",
            author: "Unknown",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: ['P144']
        })
    })
})
