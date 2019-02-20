import React from 'react';
import { Link } from 'react-router-dom';
const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"];

function PlanList(props) {
	const { plans, year } = props;
	const cards = [];
	let counter = 1;

	for (const plan in plans) {
		cards.push(
			<div className="col-md-3" key={counter++}>
				<div className="card text-white bg-secondary">
					<div className="card-body">
						<blockquote className="card-blockquote">
							<h2>{monthNames[Number(plan) - 1]}</h2>
							<h4>Year {year}</h4>
							<label htmlFor="budget">Budget:</label>
							<input className="col-md-9" name="budget"  value={plans[plan].budget} disabled />
							<label htmlFor="balance">Balance:</label>
							<input className="col-md-9" name="balance" value={plans[plan].balance} disabled />
							<div className="space-top">
								<Link to={`/plan/${year}/${Number(plan)}`} className="btn btn-secondary">Details</Link>
							</div>
						</blockquote>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="row space-top col-md-12">
			{cards}
		</div>
	)
}

export default PlanList;
