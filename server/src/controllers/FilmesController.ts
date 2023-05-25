import { Citi, Crud } from "src/global";
import { Request, Response } from 'express';
import { Filme } from "@models/Filmes";


export default class FilmesController implements Crud {
  async create(req: Request, res: Response) {
    const { title, duration, mainCharacter } = req.body;

    const isAnyUndefined = Citi.areValuesUndefined(title, duration, mainCharacter)
    if (isAnyUndefined) return res.status(400).send();

    const newFilme = { title, duration, mainCharacter };

    const { httpStatus, message } = await Citi.insertIntoDatabase(Filme, newFilme)

    return res.status(httpStatus).send({ message });
  }

  async get(request: Request, response: Response) {
    const { httpStatus, values: filmes } = await Citi.getAll(Filme);
    return response.status(httpStatus).send({ filmes });
  }
  
  // async update?: (request: Request, response: Response) => Response;
  // async delete?: (request: Request, response: Response) => Response;
}