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

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { value: filmeFound, message } = await Citi.findByID(Filme, id);

    if (!filmeFound) return res.status(400).send({ message });

    const { httpStatus, messageFromDelete } = await Citi.deleteValue(Filme, filmeFound);
    return res.status(httpStatus).send({ messageFromDelete });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, duration, mainCharacter } = req.body;

    const isAnyUndefined = Citi.areValuesUndefined(title, duration, mainCharacter, id);
    if (isAnyUndefined) return res.status(400).send();

    const filmeAtualizado = { title, duration, mainCharacter };

    const { httpStatus, messageFromUpdate } = await Citi.updateValue(Filme, id, filmeAtualizado)
    return res.status(httpStatus).send({ messageFromUpdate });

  };
}