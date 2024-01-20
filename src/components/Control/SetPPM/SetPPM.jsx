import { Button } from '@material-tailwind/react';
import { useState } from 'react';

const SetPPM = () => {
  const [value, setValue] = useState();
  const [day, setDay] = useState(1);

  const onDayChange = (e) => {
    setDay(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Make the API request using the selected day
      const response = await fetch(`http://localhost:8080/jadwal/${day}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setValue(result[0].PPM);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="flex flex-col gap-5 border border-black rounded-md p-5 bg-white w-fit">
      <select className="p-2 rounded-md border border-gray-500">
        <option>Melon</option>
      </select>
      <div className="flex gap-5 items-center">
        <label>PPM Hari ke - </label>
        <select className="p-2 rounded-md border border-gray-500" onChange={onDayChange}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
          <option>13</option>
          <option>14</option>
          <option>15</option>
          <option>16</option>
          <option>17</option>
          <option>18</option>
          <option>19</option>
          <option>20</option>
          <option>21</option>
          <option>22</option>
          <option>23</option>
          <option>24</option>
          <option>25</option>
          <option>26</option>
          <option>27</option>
          <option>28</option>
          <option>29</option>
          <option>30</option>
          <option>31</option>
        </select>
      </div>
      <Button className="bg-green-500 hover:bg-green-700" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default SetPPM;
