import React from 'react';
import setCurrency from 'utils/setCurrency';
import getSummation from 'utils/getSummation';

export const getNotes = item => {
  let isExteriorRepair = true;
  let isInteriorRepair = true;
  const totalRepair = [];

  let message = (
    <>
      {item.orderNotes ? (
        <div className="notes">
          <h3>Order Notes:</h3>
          <p>{item.orderNotes}</p>
        </div>
      ) : (
        ''
      )}

      {item.inspectionNotes ? (
        <div className="notes">
          <h3>Inspection Notes:</h3>
          <p>{item.inspectionNotes}</p>
        </div>
      ) : (
        ''
      )}
      <table className="exterior mb-3">
        {[...Array(10)].map((v, i) => {
          const isItem =
            item[`exteriorRepairDescription${i + 1}`] &&
            item[`exteriorRepairPrice${i + 1}`];

          const dom = isItem ? (
            <>
              {isExteriorRepair ? (
                <>
                  <tr>
                    <td colSpan="2" className="text-left category">
                      <h3>Exterior</h3>
                    </td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <th>Price</th>
                  </tr>
                </>
              ) : (
                ''
              )}

              <tr>
                <td className="desc">
                  {item[`exteriorRepairDescription${i + 1}`]}
                </td>
                <td className="price">
                  {setCurrency('USD', item[`exteriorRepairPrice${i + 1}`])}
                </td>
              </tr>
            </>
          ) : (
            ''
          );
          isExteriorRepair = false;

          return dom;
        })}
      </table>

      <table className="interior mb-3">
        {[...Array(10)].map((v, i) => {
          const isItem =
            item[`interiorRepairDescription${i + 1}`] &&
            item[`interiorRepairPrice${i + 1}`];

          const dom = isItem ? (
            <>
              {isInteriorRepair ? (
                <>
                  <tr>
                    <td colSpan="2" className="text-left category">
                      <h3>Interior</h3>
                    </td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <th>Price</th>
                  </tr>
                </>
              ) : (
                ''
              )}

              <tr>
                <td className="desc">
                  {item[`interiorRepairDescription${i + 1}`]}
                </td>
                <td className="price">
                  {setCurrency('USD', item[`interiorRepairPrice${i + 1}`], 2)}
                </td>
              </tr>
            </>
          ) : (
            ''
          );
          isInteriorRepair = false;

          return dom;
        })}
      </table>

      {totalRepair.length > 0 ? (
        <ul className="total-repairs">
          <li className="title">TOTAL REPAIRS</li>
          <li>{getSummation(totalRepair)}</li>
        </ul>
      ) : (
        ''
      )}
    </>
  );

  return message;
};

export default getNotes;
