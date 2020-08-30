import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { config } from 'src/global-config';
import { mapStateToLabel, mapStateToLabelHistory } from 'src/utils/helper';
import moment from 'moment';
import { get } from 'lodash';
import './styles.scss';

const steps = [
  { status: 'accepted', label: 'ACCEPTED' },
  { status: 'ready', label: 'BEING FULFILLED' },
  { status: 'delivered', label: 'DELIVERY' },
  { status: 'completed', label: 'COMPLETED' }
];

const mapLevelToWidth = {
  0: 0,
  1: 30,
  2: 60,
  3: 100
};

const TrackTrace = () => {
  const { id } = useParams();
  const [trackOrder, setTrackOrder] = useState(null);
  const journeys = get(trackOrder, 'journeys', []);
  const [completionWidth, setCompletionWidth] = useState(0);
  const [level, setLevel] = useState(null);

  useEffect(() => {
    setCompletionWidth(mapLevelToWidth[level]);
  }, [level]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(
          `${config.apiUrl}/products/track-order?id=${id}`
        );
        const data = await res.json();
        console.log('data', data);
        setTrackOrder(data.data);
        setLevel(data.data.level);
      } catch (error) {}
    };
    fetchOrderDetails();
  }, [id]);
  return (
    <div className="track-order">
      <div className="track-order__steps">
        <div className="track-order__timeline">
          <div
            className="track-order__timeline-completion"
            style={{ width: `${completionWidth}%` }}
          />
          {steps.map((step, i) => (
            <div
              className={`track-order__step ${step.status} ${
                level >= i ? `track-order__step__${step.status}-active` : ''
              }`}
            >
              <span className="track-order__step-status">{step.label}</span>
              <div
                className={`track-order__icon ${step.status}__icon ${
                  level >= i ? `${step.status}-active` : ''
                }`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="track-order__description">
        <div className="track-order__number">
          <span>Order Number :</span> {id}
        </div>
        {trackOrder && (
          <div className={`order-status ${trackOrder.state}`}>
            {mapStateToLabel(trackOrder.state)}
          </div>
        )}
        {trackOrder && (
          <div className="track-order__date">
            {moment(trackOrder.created_at).format('LLL')}
          </div>
        )}
      </div>
      <div className="track-order__history">
        <div className="track-order__head">Status History</div>
        <div className="">
          <table className="table" style={{ minWidth: 980 }}>
            <tbody>
              <tr>
                <th className="table-header first">
                  <div>Date</div>
                </th>
                <th className="table-header first">
                  <div>Status</div>
                </th>
              </tr>
            </tbody>
            <tbody>
              {journeys.length !== 0 &&
                journeys.map(item => (
                  <tr className="">
                    <td className="table-cell">
                      <div>
                        {moment(item.created_at).format('L') +
                          ' ' +
                          moment(item.created_at).format('LT')}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div style={{ fontWeight: 700, color: '#28a745' }}>
                        {mapStateToLabelHistory(item.state)}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrackTrace;
