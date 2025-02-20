import { Elysia, t } from "elysia";

export const tagModel = new Elysia().model({
  createTagSchema: t.Object({
    name: t.String(),
    icon: t.Optional(t.String()),
    iconLibrary: t.Optional(t.String()),
    campaignId: t.Optional(t.String()),
    institutionId: t.Optional(t.String()),
  }),
  
  updateTagSchema: t.Object({
    name: t.String(),
    icon: t.Optional(t.String()),
    iconLibrary: t.Optional(t.String()),
  }),

  deleteTagSchema: t.Object({
    id: t.String(),
  }),
});
