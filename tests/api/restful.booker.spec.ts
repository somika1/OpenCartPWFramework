import { ApiHelper } from "../../src/api/ApiHelper";
import {test,expect} from "../../src/fixtures/apiFixtures";

let AUTH_HEADER={Authorization:`Bearer ${process.env.API_AUTH_TOKEN}`};
test('Get--> get data for given booking', async({apiHelper})=>{
    let getResponse=await apiHelper.get(`/booking/1`,AUTH_HEADER);
    console.log("data of booking id 1 ",getResponse.body);
    expect(getResponse.status).toBe(200);
});

test('Post --> create new booking', async({apiHelper})=>{
    let bookingData={
        firstname: 'Jerry',
        lastname: 'Disney',
        totalprice: 671,
        depositpaid: true,
        bookingdates: { checkin: '2026-05-09', checkout: '2026-05-23' }
    }
    let postResponse=await apiHelper.post('/booking',bookingData,AUTH_HEADER);
    expect(postResponse.status).toBe(200);
    expect(postResponse.body.booking.firstname).toBe(bookingData.firstname);
});

