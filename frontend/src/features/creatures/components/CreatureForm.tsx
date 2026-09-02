import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { CreatureImage } from './CreatureImage';

import type { LibraryEntity } from '../../library/services/libraryService';

export interface CreatureFormAffinity {
  type: 'WEAKNESS' | 'RESISTANCE';
  targetType: 'ELEMENT' | 'DAMAGE_TYPE' | 'BODY_PART';
  targetId: string;
  description: string;
}

interface AffinityRowProps {
  affinity: CreatureFormAffinity;
  targets: LibraryEntity[];

  onChange: (patch: Partial<CreatureFormAffinity>) => void;

  onRemove: () => void;
}

function AffinityRow({
  affinity,
  targets,
  onChange,
  onRemove,
}: AffinityRowProps) {
  return (
    <Stack spacing={2}>
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={2}
      >
        <FormControl fullWidth>
          <InputLabel>Target type</InputLabel>

          <Select
            value={affinity.targetType}
            label="Target type"
            onChange={(event) => {
              onChange({
                targetType: event.target
                  .value as CreatureFormAffinity['targetType'],

                targetId: '',
              });
            }}
          >
            <MenuItem value="ELEMENT">Element</MenuItem>

            <MenuItem value="DAMAGE_TYPE">Damage type</MenuItem>

            <MenuItem value="BODY_PART">Body part</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Target</InputLabel>

          <Select
            value={affinity.targetId}
            label="Target"
            onChange={(event) =>
              onChange({
                targetId: event.target.value,
              })
            }
          >
            {targets.map((target) => (
              <MenuItem key={target.id} value={target.id}>
                {target.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <TextField
        label="Description"
        value={affinity.description}
        onChange={(event) =>
          onChange({
            description: event.target.value,
          })
        }
        multiline
        minRows={2}
      />

      <Button
        type="button"
        color="error"
        onClick={onRemove}
        sx={{
          alignSelf: 'flex-start',
        }}
      >
        Remove
      </Button>
    </Stack>
  );
}

export interface CreatureFormGalleryImage {
  url: string;
  alt: string;
  caption: string;
}

export interface CreatureFormValues {
  name: string;
  scientificName: string;
  description: string;

  threatLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';

  behavior: string;
  lifeCycle: string;
  attackStyle: string;

  habitatIds: string[];
  dietIds: string[];

  affinities: CreatureFormAffinity[];

  coverImageUrl: string;

  galleryImages: CreatureFormGalleryImage[];
}

interface CreatureFormProps {
  values: CreatureFormValues;

  habitats: LibraryEntity[];
  diets: LibraryEntity[];

  elements: LibraryEntity[];
  damageTypes: LibraryEntity[];
  bodyParts: LibraryEntity[];

  onChange: (values: CreatureFormValues) => void;
}

export function CreatureForm({
  values,
  habitats,
  diets,
  elements,
  damageTypes,
  bodyParts,
  onChange,
}: CreatureFormProps) {
  function update<K extends keyof CreatureFormValues>(
    key: K,
    value: CreatureFormValues[K],
  ) {
    onChange({
      ...values,
      [key]: value,
    });
  }

  function addAffinity(type: 'WEAKNESS' | 'RESISTANCE') {
    onChange({
      ...values,
      affinities: [
        ...values.affinities,
        {
          type,
          targetType: 'ELEMENT',
          targetId: '',
          description: '',
        },
      ],
    });
  }
  function addGalleryImage() {
    onChange({
      ...values,
      galleryImages: [
        ...values.galleryImages,
        {
          url: '',
          alt: '',
          caption: '',
        },
      ],
    });
  }

  function updateGalleryImage(
    index: number,
    patch: Partial<CreatureFormGalleryImage>,
  ) {
    const galleryImages = [...values.galleryImages];

    galleryImages[index] = {
      ...galleryImages[index],
      ...patch,
    };

    onChange({
      ...values,
      galleryImages,
    });
  }

  function removeGalleryImage(index: number) {
    onChange({
      ...values,
      galleryImages: values.galleryImages.filter(
        (_, currentIndex) => currentIndex !== index,
      ),
    });
  }

  function updateAffinity(index: number, patch: Partial<CreatureFormAffinity>) {
    const affinities = [...values.affinities];

    affinities[index] = {
      ...affinities[index],
      ...patch,
    };

    onChange({
      ...values,
      affinities,
    });
  }

  function removeAffinity(index: number) {
    onChange({
      ...values,
      affinities: values.affinities.filter(
        (_, currentIndex) => currentIndex !== index,
      ),
    });
  }

  function getTargets(
    targetType: CreatureFormAffinity['targetType'],
  ): LibraryEntity[] {
    switch (targetType) {
      case 'ELEMENT':
        return elements;

      case 'DAMAGE_TYPE':
        return damageTypes;

      case 'BODY_PART':
        return bodyParts;

      default:
        return [];
    }
  }

  console.log({
    elements,
    damageTypes,
    bodyParts,
    affinities: values.affinities,
  });

  return (
    <Stack spacing={5}>
      <Stack spacing={3}>
        <Typography variant="h4">Basic Information</Typography>
        <TextField
          label="Cover image URL"
          value={values.coverImageUrl}
          onChange={(event) => update('coverImageUrl', event.target.value)}
          placeholder="https://example.com/creature.jpg"
          type="url"
        />

        {values.coverImageUrl.trim() && (
          <Box
            component="img"
            src={values.coverImageUrl}
            alt={values.name || 'Creature preview'}
            height={320}
            sx={{ objectFit: 'cover', borderRadius: 1 }}
          />
        )}

        <TextField
          label="Name"
          value={values.name}
          onChange={(event) => update('name', event.target.value)}
          required
        />

        <TextField
          label="Scientific name"
          value={values.scientificName}
          onChange={(event) => update('scientificName', event.target.value)}
        />

        <TextField
          label="Description"
          value={values.description}
          onChange={(event) => update('description', event.target.value)}
          multiline
          minRows={4}
          required
        />

        <FormControl fullWidth>
          <InputLabel>Threat level</InputLabel>

          <Select
            value={values.threatLevel}
            label="Threat level"
            onChange={(event) =>
              update(
                'threatLevel',
                event.target.value as CreatureFormValues['threatLevel'],
              )
            }
          >
            <MenuItem value="LOW">Low</MenuItem>

            <MenuItem value="MODERATE">Moderate</MenuItem>

            <MenuItem value="HIGH">High</MenuItem>

            <MenuItem value="EXTREME">Extreme</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack spacing={3}>
        <Typography variant="h4">Ecology</Typography>

        <FormControl fullWidth>
          <InputLabel>Habitats</InputLabel>

          <Select
            multiple
            value={values.habitatIds}
            input={<OutlinedInput label="Habitats" />}
            onChange={(event) =>
              update(
                'habitatIds',
                typeof event.target.value === 'string'
                  ? event.target.value.split(',')
                  : event.target.value,
              )
            }
            renderValue={(selected) =>
              habitats
                .filter((item) => selected.includes(item.id))
                .map((item) => item.name)
                .join(', ')
            }
          >
            {habitats.map((habitat) => (
              <MenuItem key={habitat.id} value={habitat.id}>
                <Checkbox checked={values.habitatIds.includes(habitat.id)} />

                <ListItemText primary={habitat.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Diets</InputLabel>

          <Select
            multiple
            value={values.dietIds}
            input={<OutlinedInput label="Diets" />}
            onChange={(event) =>
              update(
                'dietIds',
                typeof event.target.value === 'string'
                  ? event.target.value.split(',')
                  : event.target.value,
              )
            }
            renderValue={(selected) =>
              diets
                .filter((item) => selected.includes(item.id))
                .map((item) => item.name)
                .join(', ')
            }
          >
            {diets.map((diet) => (
              <MenuItem key={diet.id} value={diet.id}>
                <Checkbox checked={values.dietIds.includes(diet.id)} />

                <ListItemText primary={diet.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Behavior"
          value={values.behavior}
          onChange={(event) => update('behavior', event.target.value)}
          multiline
          minRows={3}
        />

        <TextField
          label="Life cycle"
          value={values.lifeCycle}
          onChange={(event) => update('lifeCycle', event.target.value)}
          multiline
          minRows={3}
        />
      </Stack>

      <Stack spacing={3}>
        <Typography variant="h4">Combat</Typography>

        <TextField
          label="Attack style"
          value={values.attackStyle}
          onChange={(event) => update('attackStyle', event.target.value)}
          multiline
          minRows={3}
        />
      </Stack>

      <Stack spacing={3}>
        <Typography variant="h5">Weaknesses</Typography>

        {values.affinities
          .map((affinity, index) => ({
            affinity,
            index,
          }))
          .filter(({ affinity }) => affinity.type === 'WEAKNESS')
          .map(({ affinity, index }) => (
            <AffinityRow
              key={`weakness-${index}`}
              affinity={affinity}
              targets={getTargets(affinity.targetType)}
              onChange={(patch) => updateAffinity(index, patch)}
              onRemove={() => removeAffinity(index)}
            />
          ))}

        <Button
          type="button"
          variant="outlined"
          onClick={() => addAffinity('WEAKNESS')}
        >
          Add weakness
        </Button>
      </Stack>

      <Stack spacing={3}>
        <Typography variant="h5">Resistances</Typography>

        {values.affinities
          .map((affinity, index) => ({
            affinity,
            index,
          }))
          .filter(({ affinity }) => affinity.type === 'RESISTANCE')
          .map(({ affinity, index }) => (
            <AffinityRow
              key={`resistance-${index}`}
              affinity={affinity}
              targets={getTargets(affinity.targetType)}
              onChange={(patch) => updateAffinity(index, patch)}
              onRemove={() => removeAffinity(index)}
            />
          ))}

        <Button
          type="button"
          variant="outlined"
          onClick={() => addAffinity('RESISTANCE')}
        >
          Add resistance
        </Button>
      </Stack>

      <Stack spacing={3}>
        <Typography variant="h4">Images</Typography>

        {values.galleryImages.map((image, index) => (
          <Stack
            key={index}
            spacing={2}
            sx={{
              p: 2,
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <TextField
              label="Image URL"
              type="url"
              value={image.url}
              onChange={(event) =>
                updateGalleryImage(index, {
                  url: event.target.value,
                })
              }
            />

            <TextField
              label="Alternative text"
              value={image.alt}
              onChange={(event) =>
                updateGalleryImage(index, {
                  alt: event.target.value,
                })
              }
              placeholder={values.name || 'Creature image'}
            />

            <TextField
              label="Caption"
              value={image.caption}
              onChange={(event) =>
                updateGalleryImage(index, {
                  caption: event.target.value,
                })
              }
            />

            {image.url.trim() && (
              <CreatureImage
                src={image.url}
                alt={image.alt || values.name || 'Creature image'}
                height={220}
              />
            )}

            <Button
              type="button"
              color="error"
              onClick={() => removeGalleryImage(index)}
              sx={{
                alignSelf: 'flex-start',
              }}
            >
              Remove image
            </Button>
          </Stack>
        ))}

        <Button type="button" variant="outlined" onClick={addGalleryImage}>
          Add gallery image
        </Button>
      </Stack>
    </Stack>
  );
}
