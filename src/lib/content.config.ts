import { file, glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// Define the names collection schema based on the JSON structure
const names = defineCollection({
  loader: file('public/names.json', {
    parser: (fileContent) => {
      const data = JSON.parse(fileContent);
      return {
        'names-data': data,
      };
    },
  }),
  schema: z.object({
    'names-data': z.object({
      users: z.array(
        z.object({
          id: z.number(),
          firstName: z.string(),
          lastName: z.string(),
          maidenName: z.string(),
          age: z.number(),
          gender: z.string(),
          email: z.string().email(),
          phone: z.string(),
          username: z.string(),
          password: z.string(),
          birthDate: z.string(),
          image: z.string().url(),
          bloodGroup: z.string(),
          height: z.number(),
          weight: z.number(),
          eyeColor: z.string(),
          hair: z.object({
            color: z.string(),
            type: z.string(),
          }),
          ip: z.string(),
          address: z.object({
            address: z.string(),
            city: z.string(),
            state: z.string(),
            stateCode: z.string(),
            postalCode: z.string(),
            coordinates: z.object({
              lat: z.number(),
              lng: z.number(),
            }),
            country: z.string(),
          }),
          macAddress: z.string(),
          university: z.string(),
          bank: z.object({
            cardExpire: z.string(),
            cardNumber: z.string(),
            cardType: z.string(),
            currency: z.string(),
            iban: z.string(),
          }),
          company: z.object({
            department: z.string(),
            name: z.string(),
            title: z.string(),
            address: z.object({
              address: z.string(),
              city: z.string(),
              state: z.string(),
              stateCode: z.string(),
              postalCode: z.string(),
              coordinates: z.object({
                lat: z.number(),
                lng: z.number(),
              }),
              country: z.string(),
            }),
          }),
          ein: z.string(),
          ssn: z.string(),
          userAgent: z.string(),
          crypto: z.object({
            coin: z.string(),
            wallet: z.string(),
            network: z.string(),
          }),
          role: z.string(),
        })
      ),
    }),
  }),
});


// Define the SVG icons metadata collection
const svgIconsMetadata = defineCollection({
  loader: file('data/cluster_svg.json', {
    parser: (fileContent) => {
      const data = JSON.parse(fileContent);
      return {
        'svg-icons-metadata': data,
      };
    },
  }),
  schema: z.object({
    clusters: z.record(
      z.string(),
      z.object({
        name: z.string(),
        source_folder: z.string(),
        path: z.string(),
        keywords: z.array(z.string()),
        features: z.array(z.string()),
        title: z.string(),
        description: z.string(),
        fileNames: z.array(
          z.union([
            z.string(), // Simple filename
            z
              .object({
                fileName: z.string(),
                description: z.string().optional(),
                usecases: z.string().optional(),
                synonyms: z.array(z.string()).optional(),
                tags: z.array(z.string()).optional(),
                industry: z.string().optional(),
                emotional_cues: z.string().optional(),
                enhanced: z.boolean().optional(),
                author: z.string().optional(),
                license: z.string().optional(),
              })
              .passthrough(), // Allow additional properties
          ])
        ),
        enhanced: z.boolean().optional(),
      })
    ),
  }),
});


export const collections = {
  names,
  svgIconsMetadata
};
