import { HttpResponse } from "../helpers/httpReponse.js";

export class AddWorkSpaceController {
  constructor(addWorkSpace) {
    this.addWorkSpace = addWorkSpace;
  }
  async handle(httpRequest) {
    try {
      if (!httpRequest) {
        return HttpResponse.InternalError();
      }
      const { description, owner, priority, accessToken } = httpRequest;
      console.log(httpRequest)
      const workspace = await this.addWorkSpace.add({
        description,
        owner,
        priority,
        accessToken,
      });
      return HttpResponse.ok({ workspace });
    } catch (error) {
      console.log(error)
      return HttpResponse.unauthorizeError();
    }
  }
}