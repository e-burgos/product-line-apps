import React from 'react';
import { IDataTableStateMessage } from '../../../common/types';
import useTableColors from '../../../hooks/useTableColors';
import styles from './state-table-handler.module.css';
import Spinner from 'libs/ui/src/components/spinner';

interface StateTableHandlerProps {
  containerWith: number;
  isScrollable: boolean;
  scrollX: number;
  isLoading: boolean;
  isEmpty: boolean;
  isError: boolean;
  stateMessage?: IDataTableStateMessage;
}

const StateTableHandler: React.FC<StateTableHandlerProps> = ({
  containerWith,
  isScrollable,
  scrollX,
  isLoading,
  isEmpty,
  isError,
  stateMessage = { hideContactSupport: false },
}) => {
  const { colors } = useTableColors();

  const defaultText = {
    noData: stateMessage?.noData || 'No available data',
    noDataDescription:
      stateMessage?.noDataDescription ||
      'There is no data based on the selected criteria. Please try adjusting your filters or refreshing the page to ensure any recent changes are reflected.',
    errorData:
      stateMessage?.errorData || 'There was a problem loading the data',
    errorDataDescription:
      stateMessage?.errorDataDescription ||
      'Please try again refreshing the page or the selected content. If the problem continues or you need help, contact our Support Team.',
    contactSupport: stateMessage?.contactSupport || 'Contact Support',
    contactSupportLink:
      stateMessage?.contactSupportLink || 'https://www.estebanburgos.com.ar',
  };

  return (
    <tbody
      className={`${styles.tbodyMessageContainer} ${stateMessage?.className}`}
    >
      <tr
        style={{
          position: 'absolute',
          width: containerWith,
          transform: isScrollable ? `translateX(${scrollX}px)` : 'none',
          transition: 'transform 0.2s',
          transitionBehavior: 'smooth',
        }}
      >
        <td className={styles.messageContainer}>
          {isLoading && (
            <div className={styles.stateContainer}>
              <Spinner size="lg" />
            </div>
          )}
          {isEmpty && !isError && !isLoading && (
            <div className={styles.stateContainer}>
              <h6
                className={styles.h6Title}
                style={{ color: colors.primaryText }}
              >
                {defaultText.noData}
              </h6>
              <p
                className={styles.body2}
                style={{ color: colors.secondaryText }}
              >
                {defaultText.noDataDescription}
              </p>
              {!stateMessage?.hideContactSupport &&
                stateMessage?.contactSupportLink && (
                  <button
                    className={styles.linkButton}
                    onClick={() =>
                      window.open(defaultText.contactSupportLink, 'blank')
                    }
                  >
                    {'Contact Support'}
                  </button>
                )}
            </div>
          )}
          {isError && !isLoading && (
            <div className={styles.stateContainer}>
              <h6
                className={styles.h6Title}
                style={{ color: colors.primaryText }}
              >
                {defaultText.errorData}
              </h6>
              <p
                className={styles.body2}
                style={{ color: colors.secondaryText }}
              >
                {defaultText.errorDataDescription}
              </p>
              {!stateMessage?.hideContactSupport && (
                <button
                  className={styles.linkButton}
                  onClick={() =>
                    window.open(defaultText.contactSupportLink, 'blank')
                  }
                >
                  {'Contact Support'}
                </button>
              )}
            </div>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default StateTableHandler;
