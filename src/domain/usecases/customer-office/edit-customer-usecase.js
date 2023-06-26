import { HttpResponse } from "../../../presentation/helpers/httpReponse.js";

export class UpdateCustomerUseCase {
  constructor(caseUseCaseRepository) {
    this.caseUseCaseRepository = caseUseCaseRepository;
  }

  async update(data) {
    try {
      const editedUser = await this.caseUseCaseRepository.edit(data);
      if(!data || !editedUser) {
        return HttpResponse.InternalError()
      }

      return {
        success: true,
        message: "Cliente atualizado com sucesso.",
      }
    } catch (error) {
      console.error("Error occurred while editing:", error.message);
    }
  }
}