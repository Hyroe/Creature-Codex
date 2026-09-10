import {
  AddPhotoAlternateOutlined,
  AutoAwesomeOutlined,
  CollectionsOutlined,
  DeleteOutlined,
  ForestOutlined,
  ShieldOutlined,
} from '@mui/icons-material';

import {
  Box,
  Button,
  Card,
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

import type { LibraryEntity } from '../../library/services/libraryService';

import { CreatureImage } from './CreatureImage';
import { CreatureFormSection } from './CreatureFormSection';

export interface CreatureFormAffinity {
  type: 'WEAKNESS' | 'RESISTANCE';

  targetType: 'ELEMENT' | 'DAMAGE_TYPE' | 'BODY_PART';

  targetId: string;

  description: string;
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
    <Card
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: 'background.default',
      }}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
            },
            gap: 2,
          }}
        >
          <FormControl fullWidth size="small">
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

          <FormControl fullWidth size="small">
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
        </Box>

        <TextField
          label="Description"
          value={affinity.description}
          onChange={(event) =>
            onChange({
              description: event.target.value,
            })
          }
          size="small"
          multiline
          minRows={2}
        />

        <Button
          type="button"
          color="error"
          size="small"
          startIcon={<DeleteOutlined />}
          onClick={onRemove}
          sx={{
            alignSelf: 'flex-start',
          }}
        >
          Remove
        </Button>
      </Stack>
    </Card>
  );
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
    }
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

  const weaknesses = values.affinities
    .map((affinity, index) => ({
      affinity,
      index,
    }))
    .filter(({ affinity }) => affinity.type === 'WEAKNESS');

  const resistances = values.affinities
    .map((affinity, index) => ({
      affinity,
      index,
    }))
    .filter(({ affinity }) => affinity.type === 'RESISTANCE');

  return (
    <Stack spacing={3}>
      {/* BASIC INFORMATION */}
      <CreatureFormSection
        id="basic-information"
        icon={<AutoAwesomeOutlined />}
        title="Basic Information"
        description="Define the creature's identity and general characteristics."
      >
        <TextField
          label="Cover image URL"
          type="url"
          value={values.coverImageUrl}
          onChange={(event) => update('coverImageUrl', event.target.value)}
          placeholder="https://example.com/creature.jpg"
          fullWidth
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr 1fr',
            },
            gap: 2,
          }}
        >
          <TextField
            label="Name"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Scientific name"
            value={values.scientificName}
            onChange={(event) => update('scientificName', event.target.value)}
            fullWidth
          />
        </Box>

        <TextField
          label="Description"
          value={values.description}
          onChange={(event) => update('description', event.target.value)}
          multiline
          minRows={3}
          required
          fullWidth
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
      </CreatureFormSection>

      {/* ECOLOGY */}
      <CreatureFormSection
        id="ecology"
        icon={<ForestOutlined />}
        title="Ecology"
        description="Describe where this creature lives, feeds and behaves."
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr 1fr',
            },
            gap: 2,
          }}
        >
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
        </Box>

        <TextField
          label="Behavior"
          value={values.behavior}
          onChange={(event) => update('behavior', event.target.value)}
          multiline
          minRows={3}
          fullWidth
        />

        <TextField
          label="Life cycle"
          value={values.lifeCycle}
          onChange={(event) => update('lifeCycle', event.target.value)}
          multiline
          minRows={3}
          fullWidth
        />
      </CreatureFormSection>

      {/* COMBAT */}
      <CreatureFormSection
        id="combat"
        icon={<ShieldOutlined />}
        title="Combat"
        description="Document combat behavior, weaknesses and resistances."
      >
        <TextField
          label="Attack style"
          value={values.attackStyle}
          onChange={(event) => update('attackStyle', event.target.value)}
          multiline
          minRows={3}
          fullWidth
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: '1fr 1fr',
            },
            gap: 3,
            alignItems: 'start',
          }}
        >
          {/* WEAKNESSES */}
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6" component="h3">
                Weaknesses
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Vulnerabilities that can be exploited against this creature.
              </Typography>
            </Box>

            {weaknesses.length === 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  py: 1,
                }}
              >
                No weaknesses added.
              </Typography>
            )}

            {weaknesses.map(({ affinity, index }) => (
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
              size="small"
              onClick={() => addAffinity('WEAKNESS')}
              sx={{
                alignSelf: 'flex-start',
              }}
            >
              Add weakness
            </Button>
          </Stack>

          {/* RESISTANCES */}
          <Stack spacing={2}>
            <Box>
              <Typography variant="h6" component="h3">
                Resistances
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Elements, damage or body characteristics it resists.
              </Typography>
            </Box>

            {resistances.length === 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  py: 1,
                }}
              >
                No resistances added.
              </Typography>
            )}

            {resistances.map(({ affinity, index }) => (
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
              size="small"
              onClick={() => addAffinity('RESISTANCE')}
              sx={{
                alignSelf: 'flex-start',
              }}
            >
              Add resistance
            </Button>
          </Stack>
        </Box>
      </CreatureFormSection>

      {/* GALLERY */}
      <CreatureFormSection
        id="gallery"
        icon={<CollectionsOutlined />}
        title="Gallery"
        description="Add additional images that document this creature."
      >
        {values.galleryImages.length === 0 && (
          <Box
            sx={{
              py: 3,
              px: 2,
              border: 1,
              borderStyle: 'dashed',
              borderColor: 'divider',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <AddPhotoAlternateOutlined
              sx={{
                fontSize: 38,
                color: 'text.secondary',
                mb: 1,
              }}
            />

            <Typography variant="body2" color="text.secondary">
              No gallery images added yet.
            </Typography>
          </Box>
        )}

        <Stack spacing={2}>
          {values.galleryImages.map((image, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{
                overflow: 'hidden',
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: 'grid',

                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: '180px minmax(0, 1fr)',
                  },
                }}
              >
                <CreatureImage
                  src={image.url || null}
                  alt={image.alt || values.name || 'Creature image'}
                  height={180}
                />

                <Stack
                  spacing={1.5}
                  sx={{
                    p: 2,
                  }}
                >
                  <TextField
                    label="Image URL"
                    type="url"
                    size="small"
                    value={image.url}
                    onChange={(event) =>
                      updateGalleryImage(index, {
                        url: event.target.value,
                      })
                    }
                    fullWidth
                  />

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: {
                        xs: '1fr',
                        md: '1fr 1fr',
                      },
                      gap: 1.5,
                    }}
                  >
                    <TextField
                      label="Alternative text"
                      size="small"
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
                      size="small"
                      value={image.caption}
                      onChange={(event) =>
                        updateGalleryImage(index, {
                          caption: event.target.value,
                        })
                      }
                    />
                  </Box>

                  <Button
                    type="button"
                    color="error"
                    size="small"
                    startIcon={<DeleteOutlined />}
                    onClick={() => removeGalleryImage(index)}
                    sx={{
                      alignSelf: 'flex-start',
                    }}
                  >
                    Remove image
                  </Button>
                </Stack>
              </Box>
            </Card>
          ))}
        </Stack>

        <Button
          type="button"
          variant="outlined"
          startIcon={<AddPhotoAlternateOutlined />}
          onClick={addGalleryImage}
          sx={{
            alignSelf: 'flex-start',
          }}
        >
          Add gallery image
        </Button>
      </CreatureFormSection>
    </Stack>
  );
}
