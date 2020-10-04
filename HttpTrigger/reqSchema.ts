import Joi, {ObjectSchema} from "joi";

const idList: (value: any, helpers: any) => any = (value, helpers) => {
    const arrayed: string[] = value.split(",");
    if (!arrayed.length) {
        return helpers.error("any.invalid");
    }

    return value;
};

export const reqSchema: ObjectSchema = Joi.object({
    id: Joi.string().custom(idList).required(),
    type: Joi.string(),
});
