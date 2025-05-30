/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MODE, useTheme } from 'libs/ui/src/themes/index';

/**
 * useTableColors hook.
 * This hook is used to get the colors used in the table.
 * The function of this hook is to have a single source of truth for the colors used in the table without opacity.
 *
 * @category ui/datatable
 * @subcategory Hooks
 *
 * @property {string} primary is used as the primary color for the table, reference MUI palette color: theme.palette.primary.main.
 * @property {string} defaultBg is used as the default background color for the table, reference MUI palette color: theme.palette.background.default.
 * @property {string} headerBg is used as the header background color for the table, reference MUI palette color: theme.palette.common.p[4].
 * @property {string} paperBg is used as the paper background color for the table, reference MUI palette color: theme.palette.background.paper.
 * @property {string} primaryText is used as the primary text color for the table, reference MUI palette color: theme.palette.text.primary.
 * @property {string} secondaryText is used as the secondary text color for the table, reference MUI palette color: theme.palette.text.secondary.
 * @property {string} divider is used as the divider color for the table, reference MUI palette color: theme.palette.divider.
 * @property {string} disabled is used as the disabled color for the table, reference MUI palette color: theme.palette.action.disabled.
 * @property {string} rowHover is used as the row hover color for the table, reference MUI palette color: theme.palette.action.hover.
 * @property {string} actionHover is used as the action hover color for the table, custom color.
 * @property {string} rowExpandedBg is used as the row expanded background color for the table, custom color.
 * @property {string} headerExpandedBg is used as the header expanded background color for the table, custom color.
 * @property {string} rowBg is used as the row background color for the table, custom color.
 * @property {string} dividerColumns is used as the divider columns color for the table, custom color.
 * @property {Object} paletteColors is used to get the colors used in the table.
 * @property {Object} darkColors is used to get the dark colors used in the table.
 * @property {Object} lightColors is used to get the light colors used in the table.
 * @property {Object} colors is used to get the colors used in the table.
 *
 * @returns {Object} The colors used in the table.
 */

export type PaletteModeType = MODE;

export const useTableColors = () => {
  const { mode, preset } = useTheme();
  const themeMode = mode;

  const lightTableTheme = {
    mode: 'light',
    palette: {
      table: {
        primary: {
          main: '#2F6BE4',
        },
        text: {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.6)',
          disabled: 'rgba(0, 0, 0, 0.38)',
        },
        box: {
          default: 'rgba(245, 248, 255, 0.02)',
        },
        header: {
          default: 'rgba(0, 0, 0, 0.04)',
          divider: 'rgba(0, 0, 0, 0.12)',
          action: {
            expanded: 'rgba(245, 248, 255, 0.02)',
            pinned: 'rgb(227,230,236)',
            dragged: '#E5EBF7',
          },
        },
        row: {
          default: 'transparent',
          divider: 'rgba(0, 0, 0, 0.12)',
          action: {
            hover: 'rgba(0, 0, 0, 0.08)',
            expanded: 'rgba(245, 248, 255, 0.02)',
            dragged: '#E5EBF7',
            pinned: {
              default: 'rgb(245, 248, 255)',
              hover: 'rgb(208, 211, 217)',
            },
          },
        },
        button: {
          default: 'rgb(237, 240, 247)',
          action: {
            hover: 'rgba(0, 0, 0, 0.04)',
            disabled: 'rgba(0, 0, 0, 0.38)',
          },
        },
      },
    },
  };

  const darkTableTheme = {
    mode: 'dark',
    palette: {
      table: {
        primary: {
          main: '#2F6BE4',
        },
        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.7)',
          disabled: 'rgba(255, 255, 255, 0.3)',
        },
        box: {
          default: 'rgba(245, 248, 255, 0.02)',
        },
        header: {
          default: 'rgba(255, 255, 255, 0.04)',
          divider: 'rgba(255, 255, 255, 0.12)',
          action: {
            expanded: 'rgba(245, 248, 255, 0.02)',
            pinned: 'rgb(43, 45, 49)',
            dragged: '#16191F',
          },
        },
        row: {
          default: 'transparent',
          divider: 'rgba(255, 255, 255, 0.12)',
          action: {
            hover: 'rgba(255, 255, 255, 0.08)',
            expanded: 'rgba(245, 248, 255, 0.02)',
            dragged: '#16191F',
            pinned: {
              default: 'rgb(26,28,32)',
              hover: 'rgb(60, 62, 65)',
            },
          },
        },
        button: {
          default: 'rgb(27, 29, 34)',
          action: {
            hover: 'rgba(255, 255, 255, 0.08)',
            disabled: 'rgba(255, 255, 255, 0.3)',
          },
        },
      },
    },
  };

  const handleColors = (mode: PaletteModeType) => {
    if (mode === 'light') {
      return {
        primary: '#2F6BE4',
        secondary: '#662DFF',
        primaryText: 'rgba(0, 0, 0, 0.87)',
        secondaryText: 'rgba(0, 0, 0, 0.6)',
        paperBg: '#E5EBF7',
        defaultBg: '#F5F8FF',
        boxBg: 'rgba(245, 248, 255, 0.02)',
        headerBg: 'rgba(0, 0, 0, 0.04)',
        headerExpandedBg: 'rgba(245, 248, 255, 0.02)',
        headerPinned: 'rgb(226,229,235)',
        rowBg: 'transparent',
        rowHover: 'rgba(0, 0, 0, 0.08)',
        rowExpandedBg: 'rgba(245, 248, 255, 0.02)',
        rowPinned: 'rgb(240, 243, 250)',
        rowPinnedHover: 'rgb(208, 211, 217)',
        actionBg: 'rgb(237, 240, 247)',
        actionHover: 'rgba(0, 0, 0, 0.04)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        divider: 'rgba(0, 0, 0, 0.12)',
        dividerColumns: 'rgba(0, 0, 0, 0.28)',
      };
    }
    if (mode === 'dark') {
      return {
        primary: '#2F6BE4',
        secondary: '#662DFF',
        primaryText: 'rgba(255, 255, 255)',
        secondaryText: 'rgba(255, 255, 255, 0.7)',
        paperBg: '#16191F',
        defaultBg: '#101217',
        boxBg: 'rgba(245, 248, 255, 0.02)',
        headerBg: '#2A2D31',
        headerExpandedBg: '#2B2E32',
        headerPinned: 'rgb(44,46,49)',
        rowBg: '#1A1C20',
        rowHover: 'rgba(255, 255, 255, 0.08)',
        rowExpandedBg: 'rgba(245, 248, 255, 0.02)',
        rowPinned: 'rgb(29, 32, 37)',
        rowPinnedHover: 'rgb(60, 62, 65)',
        actionBg: 'rgb(27, 29, 34)',
        actionHover: 'rgba(255, 255, 255, 0.08)',
        disabled: 'rgba(255, 255, 255, 0.3)',
        divider: 'rgba(255, 255, 255, 0.12)',
        dividerColumns: 'rgba(255, 255, 255, 0.3)',
      };
    }
  };

  const darkColors = handleColors('dark');
  const lightColors = handleColors('light');
  const colorsV1 = handleColors(themeMode);

  const colors = {
    primary: preset.value,
    secondary: handleColors(themeMode)?.secondary,
    primaryText: handleColors(themeMode)?.primaryText,
    secondaryText: handleColors(themeMode)?.secondaryText,
    paperBg: handleColors(themeMode)?.paperBg,
    defaultBg: handleColors(themeMode)?.defaultBg,
    // background for background and show dividers for rows
    boxBg: 'rgba(245, 248, 255, 0.02)',
    // background for header
    headerBg: themeMode === 'dark' ? '#1E2025' : '#EBEEF6',
    // background for button actions
    buttonBg: 'transparent',
    // background for button actions on hover
    buttonBgHover:
      themeMode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
    // table header background in subComponent table
    headerExpandedBg: themeMode === 'dark' ? '#222529' : '#EBEEF6',
    // header background when is pinned
    headerPinned: themeMode === 'dark' ? '#1E2025' : '#EBEEF6',
    // header background when is pinned solid for not have transparency
    // headerSolidBg: themeMode === 'dark' ? '#1E2025' : '#EBEEF6',
    // default row background
    rowBg: handleColors(themeMode)?.rowBg,
    // default row background hover
    rowHover:
      // solid color for hover row
      themeMode === 'dark'
        ? // color calculated for hover row between #1E2025 (bg row) and rgba(255,255,255,.08) (bg hover)
          '#292B31'
        : // color calculated for hover row between #E5EBF7 (bg row) and rgba(100,100,100,.08) (bg hover)
          '#DBE0EB',
    // row expanded background
    rowExpandedBg: themeMode === 'dark' ? '#191B20' : '#EBEEF6',
    // row pinned background
    rowPinned: handleColors(themeMode)?.rowPinned,
    // row pinned background hover
    rowPinnedHover:
      themeMode === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(100,100,100,.08)',
    // background when row is dragged
    draggedBg:
      themeMode === 'dark' ? darkTableTheme.palette.table.box : '#E5EBF7',
    // background to action button(UNUSED: replaced for buttonBg)
    actionBg: 'rgb(27, 29, 34)',
    // background to action button hover(UNUSED: replaced for buttonBgHover)
    actionHover: 'transparent',
    // color disabled for text and icons
    disabled: handleColors(themeMode)?.disabled,
    // color for divider resize columns
    divider: handleColors(themeMode)?.divider,
    // color for divider columns pinned
    dividerColumns: handleColors(themeMode)?.dividerColumns,
  };

  const tableTheme =
    themeMode === 'light'
      ? lightTableTheme.palette.table
      : darkTableTheme.palette.table;

  const paletteColors = Object.keys(colors).map((key) => {
    // @ts-ignore
    return { name: key, dark: darkColors[key], light: lightColors[key] };
  });

  const paletteLightColors = Object.keys(lightTableTheme).map((key) => {
    // @ts-ignore
    return { name: key, color: lightColors[key] };
  });

  const paletteDarkColors = Object.keys(darkTableTheme).map((key) => {
    // @ts-ignore
    return { name: key, color: darkColors[key] };
  });

  return {
    themeMode,
    colorsV1,
    colors,
    paletteColors,
    paletteLightColors,
    paletteDarkColors,
    darkColors,
    lightColors,
    tableTheme,
    darkTableTheme,
    lightTableTheme,
  };
};

export default useTableColors;
